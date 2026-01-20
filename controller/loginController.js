const bcrypt = require("bcrypt");
const User=require('../model/User');
const jwt = require("jsonwebtoken");

async function loggedIn(req,res,next) {
    try {
        const user=await User.findOne({email:req.body.email})
        if(user)
        {
            const isValidpassword=await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(isValidpassword)
            {
                const userObject = {
                    userid: user._id,
                    username: user.name,
                    email: user.email,
                    role:user.role
                  };

                  const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                  });


                res.status(200).json({message:"Login jwt generated",toke:`Bearer ${token}`});
                

            }
            else{
                return res.status(401).json({msg:"Login failed! Please try again."})
            }
        }
        else{
            return res.status(401).json({msg:"Login failed! Please try again."})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({err:error});
    }
   
}


module.exports={
    loggedIn,

}