const User = require("../models/user");
const searchUser = async (req, res) => {
	const { searchTerm } = req.body;
	console.log(req.body);
	try {
		const userData = await User.find({});
		const result = userData.filter((item) => {
            if(item.username.toLowerCase().includes(searchTerm.toLowerCase())){
                return {
                    username:item?.username,
                    email:item?.email,
                    profileUrl:item?.profileUrl,
                    userId:item?._id
                }
            }
        })
        res.send(result);
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: "UnSucessfull" });
	}
};

module.exports = {
	searchUser,
};
