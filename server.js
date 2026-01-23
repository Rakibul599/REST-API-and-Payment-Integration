const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

// router
const registrationRouter=require('./router/registrationRouter');
const loginRouter=require('./router/loginRouter');
const profileRouter=require('./router/profileRoute');
const productRouter=require('./router/productRouter');
const orderRoutes = require("./router/orderRoutes");
const errorHandler = require("./middleware/errorHandler");


const server=express();
dotenv.config();

// Parse JSON
server.use(express.json());
// database connection
mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Route handle
server.use('/api',registrationRouter) //registration route
server.use('/api',loginRouter) //login route
server.use('/api',profileRouter) //login route
server.use('/api',productRouter) //Products route
server.use("/api/orders", orderRoutes);

// error handler
server.use(errorHandler);

server.get('/',(req,res)=>{
    res.send("server is running");
})
server.listen(process.env.PORT,()=>{
    console.log(`server is running on port:${process.env.PORT}`);
});