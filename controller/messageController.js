const message = require("../models/message");
const handleMeaasge = async (req, res) => {
	const { senderId, receiverId } = req.body;
	console.log(req.body);
	if (senderId != null && receiverId != null) {
		let messageList = await message
			.find({
				$or: [
					{ sender: senderId, receiver: receiverId },
					{ sender: receiverId, receiver: senderId },
				],
			})
			.sort({ updatedAt: 1 })
			.exec();
		res.status(200).send({
			messages: messageList,
		});
	} else {
		res.status(500).send({
			messages: "Server Issue",
		});
	}
};

module.exports = {
	handleMeaasge,
};
