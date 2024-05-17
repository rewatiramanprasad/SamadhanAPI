const express=require('express');
const serviceRoute=express.Router();
const {serviceLogin,serviceSignup,showUserProblem,addProposal}=require('./controller');





serviceRoute.get('/',(req,res)=>{res.send("service route is working")});

serviceRoute.post('/Loginservice',serviceLogin);
serviceRoute.post('/signupservice',serviceSignup)
serviceRoute.post('/service/dashboard',showUserProblem)
serviceRoute.post('/service/addProposal',addProposal)

module.exports={serviceRoute}