const User = require("../models/user");
const addUser = async (req, res) => {
	const { senderId, receiverId} = req.body;
	console.log(req.body);
	try {
		const senderContact = await User.updateOne(
			{ _id: senderId },
			{ $push: { userContacts: receiverId } }
		);
		const receiverContact = await User.updateOne(
			{ _id: receiverId },
			{ $push: { userContacts: senderId } }
		);
        res.send("sucessfull")
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: "UnSucessfull" });
	}
};

module.exports = {
	addUser,
};
