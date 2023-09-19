const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/databaseConnection");
const socket = require("socket.io");
const generateUniqueId = require("generate-unique-id");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = "https://chat-app-backend-1iq1.onrender.com";
connectDB();

app.use("/register", require("./routes/userRegister"));
app.use("/login", require("./routes/userLogin"));
app.use("/addmessage", require("./routes/addMessageRoute"));
app.use("/getmessage", require("./routes/messageList"));
app.use("/getUsers", require("./routes/getAllUserRoute"));

const server = http.createServer(app); // Create an HTTP server
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	server.listen(PORT, () => {
		console.log(`Server is Listening in port ${PORT}`);
	});
});

const io = socket(server, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});
onlineUsers = new Map();
io.on("connection", (socket) => {
	socket.on("add-user", (userId) => {
		console.log(userId)
	});

	socket.on("send-message", (data) => {
		console.log(data)
		const {from , to} = data.data;
		if (onlineUsers.has(from+to) || onlineUsers.has(to+from)) {
			let roomId = onlineUsers.get(from+to) || onlineUsers.get(to+from);
			console.log(roomId)
			socket.join(roomId)
			socket.broadcast.in(roomId).emit("msg-recieve", data.text);
		}else{
			const uniqueId = generateUniqueId({ length: 6 });
			console.log(uniqueId)
			onlineUsers.set(from + to, uniqueId);
			onlineUsers.set(to + from, uniqueId);
			socket.broadcast.in(uniqueId).emit("msg-recieve", data.text);
		}
	});
});