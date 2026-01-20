const express=require('express');
const {loggedIn}=require('../controller/loginController');
const { loginValidators, loginValidationHandler } = require('../middleware/loginValidator');

const router=express.Router();

router.post('/login',loginValidators,loginValidationHandler,loggedIn);

module.exports=router;