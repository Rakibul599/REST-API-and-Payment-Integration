const bcrypt = require("bcrypt");
const User=require('../model/User');


async function registrationController(req,res,next){
const {password}=req.body;
console.log("hello")
// hash password
const hashPassword=await bcrypt.hash(password,10);
let newUser=User({
    ...req.body,
    password:hashPassword
});
try {
    // save data into database
    const result=await newUser.save();
    const finalResult={
        name:result.name,
        email:result.email,
        role:result.role
    }
    res.status(200).json({message:"Registration was successfully",data:finalResult});
} catch (error) {
    res.status(500).json({"message":error.message});
}
 
}

module.exports=registrationController;
