const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://vishalshenoy603:vishal@cluster0.hzbz4nk.mongodb.net/",
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
	} catch (err) {
		console.log(err);
	}
};
module.exports = connectDB;
