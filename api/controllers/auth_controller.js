import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully");
  } catch (error) {
  next(error.message)
  }
};

export const signin= async(req,res)=>{
    const {email,password}= req.body
    try {
        const exisistingUser= await User.findOne({ email})
        if(!exisistingUser){
            return res.status(404).json({ success: false, message: 'User not found' });

        }
        const validPassword= bcryptjs.compareSync(password,exisistingUser.password);
        if(!validPassword) return res.status(401).json({success:false,messag:'Invalid Credentials'})

        const token= jwt.sign({id : exisistingUser._id},process.env.JWT_SECRET)
        const {password :pass, ...rest}= exisistingUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error.message)
    }
}