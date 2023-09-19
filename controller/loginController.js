const User = require("../models/user");
const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (email != null && password != null) {
		const user = await User.findOne({ email: email });
		if (user) {
			const isMatch = password == user.password;
			if (isMatch) {
				res.status(200).send({
					_id: user._id,
					username: user.username,
					email: user.email,
					message: "Successful",
				});
			} else {
				res.status(400).send({ message: "UnSuccessful" });
			}
		} else {
			res.status(400);
		}
	}
};

module.exports = {
	handleLogin,
};
