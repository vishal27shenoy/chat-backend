const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/databaseConnection");
const socket = require("socket.io");
const generateUniqueId = require("generate-unique-id");
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = 5000;
connectDB();

app.use("/register", require("./routes/userRegister"));
app.use("/login", require("./routes/userLogin"));
app.use("/addmessage", require("./routes/addMessageRoute"));
app.use("/getmessage", require("./routes/messageList"));
app.use("/getUsers", require("./routes/getAllUserRoute"));
app.use("/profile", require("./routes/profileRoute"));

const server = http.createServer(app); // Create an HTTP server
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	server.listen(PORT, () => {
		console.log(`Server is Listening in port ${PORT}`);
	});
});

const io = socket(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST", "PUT"],
		credentials: false,
	},
});
let onlineUsers = new Map();
io.on("connection", (socket) => {

	socket.on("set-online" ,(userID) => {
		console.log(userID,socket.id);
		onlineUsers.set(userID,socket.id);
	});

	socket.on("send-msg", ({text , from ,to}) => {
		const sendUserSocket = onlineUsers.get(to);
		console.log(text,from,to,sendUserSocket);
		if (sendUserSocket) {
			console.log("if");
			socket.to(sendUserSocket).emit("msg-recieve", text , from , to);
		}else{
			console.log("else");
			const sendSendersSocket = onlineUsers.get(from);
			socket.to(sendSendersSocket).emit("not-online",text,from);
		}
	});

	socket.on("disconnect", (from) => {
		onlineUsers.delete(from)
	});

});