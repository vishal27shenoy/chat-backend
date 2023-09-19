const User = require("../models/user");
const getAllUser = async (req, res) => {
	console.log(req.body);
	try {
		 const users = await User.find({});
		if (users) {
			res.status(200).send({
				message: "message added sucessfully",
                data:users
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: "UnSucessfull" });
	}
};

module.exports = {
	getAllUser,
};
