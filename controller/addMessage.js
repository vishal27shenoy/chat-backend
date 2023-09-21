const message = require("../models/message");
const addMeaasge = async (req, res) => {
	const { senderId, receiverId, messageText } = req.body;
	console.log(req.body);
	try {
		const messageDoc = new message({
			message: messageText,
			sender: senderId,
			receiver: receiverId,
		});
		const result = await messageDoc.save();
		if (result) {
			res.status(200).send({
				message: "message added sucessfully",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: "UnSucessfull" });
	}
};

module.exports = {
	addMeaasge,
};
