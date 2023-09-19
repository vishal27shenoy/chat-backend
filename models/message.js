const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "RegisterSchema",
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "RegisterSchema",
		},
	},
	{ timestamps: true }
);

const messages = new mongoose.model("messages", Schema);
module.exports = messages;
