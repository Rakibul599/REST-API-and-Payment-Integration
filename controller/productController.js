const Product=require('../model/Product');
async function createProduct(req,res)
{
    const product=Product(
       req.body
    );
    try {
        const result= await product.save();
        res.status(201).json({message:"Product created",data:result});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
   
}
async function getProduct(req,res) {
    try {
        const result=await Product.find();
        res.status(201).json({message:"Product list",data:result});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}
module.exports={createProduct,getProduct};