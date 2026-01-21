const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    price:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        require:true
    },
    stock:{
        type:Number,
        require:true,
    }
},
{
    timestamps:true
}
);
const Product=mongoose.model('Product',productSchema);
module.exports=Product;