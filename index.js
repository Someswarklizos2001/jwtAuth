const express=require('express');
const cors=require('cors');
const app=express();
const cookieParser=require('cookie-parser');
app.use(cookieParser());

//imports
const connection = require('./db/connection');
const register=require('./Controller/register');
const login=require('./Controller/login');
const googleLogin=require('./Controller/googleLogin')
const authChecking=require('./Controller/auth');
const logout=require('./Controller/logout');
const addToCart=require('./Controller/cart/addToCart');
const getCartId=require('./Controller/cart/getCartId');
const getUserCart=require("./Controller/cart/getUserCart")
const cartIncrease=require("./Controller/cart/cartincrease");
const cartDecrease=require("./Controller/cart/cartdecrease");
const initializeProducts=require("./Controller/products/initializeProducts");
const fetchProducts=require("./Controller/products/fetchProducts");
const searchproducts=require("./Controller/products/searchproducts");
const removecartproduct=require("./Controller/cart/removecartproduct");
const getsimilarCategory=require("./Controller/products/getsimilarproducts");
const checkout=require("./Controller/checkout/payment")
const cartcheckout=require("./Controller/checkout/cartPayment")

//middlewares
app.use(express.json()); 
app.use(cors({
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true,
    allowedHeaders: ['x-access-token', 'x-refresh-token', 'Content-Type']
}))


//db connection
connection();

//Controller
app.use('/api',register);
app.use('/api',login);
app.use('/api',authChecking);
app.use('/api',logout);
app.use('/api',googleLogin);
app.use('/api',addToCart);
app.use('/api',getCartId);
app.use("/api",getUserCart);
app.use("/api",cartIncrease);
app.use("/api",cartDecrease);
app.use("/api",initializeProducts);
app.use("/api",fetchProducts);
app.use("/api",searchproducts);
app.use("/api",removecartproduct);
app.use("/api",getsimilarCategory);
app.use("/api",checkout);
app.use("/api",cartcheckout);

app.listen(3001,()=>{
   console.log('app is listening on 3001');
})
