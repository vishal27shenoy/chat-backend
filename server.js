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
onlineUsers = new Map();
io.on("connection", (socket) => {
	socket.on("add-user", (userId) => {
		console.log(userId,"came here")
		onlineUsers.set(userId, socket.id);
	});
	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.data.to);
		console.log(data,sendUserSocket);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-recieve", data);
		}
	});
});