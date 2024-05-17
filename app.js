const express=require('express');
const config=require('./config/config.json');
const {userRoute} = require('./user/routes');
const {serviceRoute} = require('./service/routes');
const app=express();
const port=config['port']||process.env.port;

app.use(express.json());
app.use(userRoute);
app.use(serviceRoute);









app.listen(port,()=>{console.log(`running on http://localhost:${port}/`)})