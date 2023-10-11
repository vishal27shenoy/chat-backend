const User = require("../models/user");
const getContact = async (req, res) => {
	const { userId,  } = req.body;
	console.log(req.body);
	try {
        const userData = await User.findOne({_id : userId});
        console.log(userData);
        const response = await User.find({
			_id: {
				$in: userData.userContacts,
			},
		});
        res.send(response);
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: "UnSucessfull" });
	}
};

module.exports = {
	getContact,
};
