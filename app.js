const express=require('express');
// const config=require('./config/config.json');
const {userRoute} = require('./user/routes');
const {serviceRoute} = require('./service/routes');
const cors = require('cors');
const app=express();
const port=process.env.port||5454;

app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(serviceRoute);









app.listen(port,()=>{console.log(`running on http://localhost:${port}/`)})