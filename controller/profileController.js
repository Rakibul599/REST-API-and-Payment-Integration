const User=require('../model/User');
async function getProfile(req,res){
    try {
        userProfile=await User.findById(req.user.userid).exec();
        const result={
            name:userProfile.name,
            email:userProfile.email,
            role:userProfile.role
        }
        res.status(200).json({message:"user Profile",details:result});
    } catch (error) {
        res.status(404).json({message:"User not found"});
    }
}

module.exports=getProfile;