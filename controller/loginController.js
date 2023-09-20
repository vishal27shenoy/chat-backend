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
					profileUrl:user.profileUrl,
					message: "Successful",
				});
			} else {
				res.status(401).send({ message1: "Login Failed",message2:"Invalid Credentials" });
			}
		} else {
			res.status(503).send({
				message1: "Server Error",
				message2: "Server is under maintainance",
			});
		}
	}
};

module.exports = {
	handleLogin,
};
