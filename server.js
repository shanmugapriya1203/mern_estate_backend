import express from 'express'
import mongoose from 'mongoose';
import userrouter from './api/routes/user_route.js'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Mongoose default connection is done')
})
.catch((err)=>{
    console.log(err)
})

const app= express();

app.listen(8000,()=>{
    console.log('Server is running on Port 8000 !')
})


app.get('/',(req,res)=>{
    res.json({
        message: "Welcome to the Real Estate API!",
        description: "This API powers the Real Estate application's backend.",
        version: "1.0"
      });
    
})

app.use('/api/user',userrouter)