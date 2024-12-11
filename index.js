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


//middlewares
app.use(express.json()); 
app.use(cors({
    origin:"jwt-frontend-nxsezt5vc-som-2001s-projects.vercel.app",
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

app.listen(3001,()=>{
   console.log('app is listening on 3001');
})
