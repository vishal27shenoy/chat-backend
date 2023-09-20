const User = require("../models/user");
const handleProfile = async (req, res) => {
	const { profileUrl,id } = req.body;
	const user = await User.findById(id);
    if(!user){
        res.status(404).send({message1:"user not found",message2:"create account"});
    }
    user.profileUrl = profileUrl;
    const result = await user.save();
    if(result){
        res.status(200).send({message:"Profile Updated"});
    }else{
        res.status(503).send({message1 : "Server Error",message2:"Server is under maintainence"});
    }
};

module.exports = {
	handleProfile,
};
