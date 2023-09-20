const message = require("../models/message");
const handleMeaasge = async (req, res) => {
	const { senderId, receiverId } = req.body;
	console.log(req.body);
	if (senderId != null && receiverId != null) {
		let messageList =message.find({
				$and: [{ sender: senderId }, { receiver: receiverId }],
			})
			.sort({ createdAt: 1 });
        res.status(200).send({
            messages:messageList
        });
	}else{
        res.status(500).send({
			messages: "Server Issue",
		});
    }
};

module.exports = {
	handleMeaasge,
};
