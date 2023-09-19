const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
        profileUrl:{
            type:String,
        },
		password: {
			required: true,
			minlength: 8,
			type: String,
		},
	},
	{ timestamps: true }
);

const RegisterSchema = new mongoose.model("RegisterSchema", Schema);
module.exports = RegisterSchema;
