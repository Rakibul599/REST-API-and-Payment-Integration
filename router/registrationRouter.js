const express=require('express');
const registrationController = require('../controller/registrationController');
const { newUservalidators, newUserValidationHandler } = require('../middleware/registrationValidator');

const router=express.Router();

router.post('/registration',newUservalidators,newUserValidationHandler,registrationController);

module.exports=router;