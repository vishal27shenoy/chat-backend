const User = require("../models/user");
const handleRegister = async (req, res) => {
	const { username, email, password } = req.body;
	const user = await User.findOne({ email: email });
	if (user) {
		res.send({ message: "UnSucessfull" });
	} else {
		const SchemaValue = new User({
			username: username,
			email: email,
			password: password,
		});
		const result = await SchemaValue.save();
		if(result) {
			res.status(200).send({
				message: "Sucessfull",
				id: result._id,
			});
		} else {
			res.status(400).send("UnSucessfull");
		}
	}
};

module.exports = {
	handleRegister,
};
