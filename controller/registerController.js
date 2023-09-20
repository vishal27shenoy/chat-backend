const User = require("../models/user");
const handleRegister = async (req, res) => {
	const { username, email, password } = req.body;
	console.log(req.body)
	const user = await User.findOne({ email: email });
	if (user) {
		res.status(409).send({message1:"User Exist", message2: "User with this credentials exist" });
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
				username:result.username,
				email:result.email,
				id: result._id,
			});
		} else {
			res.status(503).send({message1 : "UnSucessfull",message2:"Server under maintainence"});
		}
	}
};

module.exports = {
	handleRegister,
};
