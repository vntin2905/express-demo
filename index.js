require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route')
const authMiddleware = require('./middlewares/auth.middleware')
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const productApiRoute = require('./api/routes/product.route')
const sessionMiddleware = require('./middlewares/session.middleware');
const todolistApiRoute = require('./api/routes/todolist.route')
const cookieParser = require('cookie-parser')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-demo');
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(cookieParser(process.env.SECRET_KEY))
app.use(sessionMiddleware);
app.get('/',(req,res)=>{
    res.render('index',{
        name: 'AAA'
    });
})

app.use('/users',authMiddleware.requireAuth,userRoute);
app.use('/auth',authRoute);
app.use('/products',productRoute);
app.use('/cart',cartRoute);
app.use('/api/products',productApiRoute);
app.use('/api/todolists',todolistApiRoute);

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})