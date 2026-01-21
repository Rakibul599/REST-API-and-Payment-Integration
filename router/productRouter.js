const express=require('express');
const getProfile = require('../controller/profileController');
const auth = require('../middleware/auth');
const { createProduct,getProduct } = require('../controller/productController');
const { productValidators, productValidationHandler } = require('../middleware/productValidator');


const router=express.Router();
// Product create route
router.post('/products',auth,productValidators,productValidationHandler,createProduct);
// product get route
router.get('/products',getProduct)

module.exports=router;