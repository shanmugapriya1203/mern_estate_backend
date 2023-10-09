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

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const validPassword = bcryptjs.compareSync(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = existingUser._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error.message);
  }
};


export const google= async(req,res)=>{
  const { email}= req.body;
try {
  const user= await User.findOne({email})
  if(user){
const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
const {password:passs, ...rest}=user._doc;
res
.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
  }
  else{
const generatedPassword= Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
const hashedPassword= bcryptjs.hashSync(generatedPassword,10);
const newUser= new User({username:req.body.name.split(" ").join(" ").toLowerCase()+Math.random().toString(36).slice(-4),email,password:hashedPassword,avatar:req.body.photo})
await newUser.save();
const token= jwt.sign({id:newUser._id},process.env.JWT_SECRET);
const {password:pass,...rest}= newUser._doc;
res
.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
  
  }
} catch (error) {
  next(error.message);
}
}