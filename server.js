import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser
import userrouter from './api/routes/user_route.js';
import authRouter from './api/routes/auth_route.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Mongoose default connection is done');
}).catch((err) => {
  console.log(err);
});

const app = express();


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(8000, () => {
  console.log('Server is running on Port 8000!');
});

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Real Estate API!",
    description: "This API powers the Real Estate application's backend.",
    version: "1.0"
  });
});

app.use('/api/user', userrouter);
app.use('/api/auth', authRouter);
