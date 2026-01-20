const User=require('../model/User');
async function getProfile(req,res){
    try {
        userProfile=await User.findById(req.user.userid).exec();
        res.status(200).json({message:"user Profile",details:userProfile});
    } catch (error) {
        res.status(404).json({message:"User not found"});
    }
}

module.exports=getProfile;