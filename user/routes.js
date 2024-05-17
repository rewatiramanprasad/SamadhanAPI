const express=require('express');
const { userLogin,userSignup,insertProblem,showProblem } = require('./controller');
const userRoute=express.Router();

userRoute.get('/',(req,res)=>{res.status(200).send("yeah its working").end()})
userRoute.post('/Loginuser',userLogin)
userRoute.post('/signupuser',userSignup)
userRoute.post('/user/problem',insertProblem)
userRoute.post('/user/dashboard',showProblem)







module.exports={userRoute};