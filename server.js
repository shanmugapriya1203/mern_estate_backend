import express from 'express'
import mongoose from 'mongoose';
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