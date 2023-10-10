import User from "../models/user_model.js";
import { errorHandler } from "../utils/error.js"
import  bcryptjs from 'bcryptjs';



export const test=(req,res)=>{
    res.json({
        message:'Api Routes is working'
    })
}

export const updateUser = async (req, res, next) => {
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return next(errorHandler(404, 'User not found!'));
      }
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  