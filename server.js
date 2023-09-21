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
		console.log(userId);
	});

	socket.on("set-users", (data) => {
		console.log(data);
		const { from, to } = data.data;
		if (!onlineUsers.has(from + to) || !onlineUsers.has(to + from)) {
			const uniqueId = generateUniqueId({ length: 6 });
			onlineUsers.set(from + to, uniqueId);
			onlineUsers.set(to + from, uniqueId);
		}
	});

	socket.on("send-message", (data) => {
		console.log(data);
		const { from, to } = data.data;
		if (onlineUsers.has(from + to) || onlineUsers.has(to + from)) {
			let roomId =
				onlineUsers.get(from + to) ||
				onlineUsers.get(to + from);
			socket.join(roomId);
			let value = { text: data.text, sender: from, receiver: to };
			socket.broadcast.in(roomId).emit("msg-recieve", value);
		} 
	});
});
