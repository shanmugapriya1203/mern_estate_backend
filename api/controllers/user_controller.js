import Listing from "../models/listing_model.js";
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

  export const deleteUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;
  
      const deletedUser = await User.findByIdAndRemove(userId);
  
      if (!deletedUser) {
        return next(errorHandler(404, 'User not found!'));
      }
  
      const { password, ...rest } = deletedUser._doc;
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  
  export const getUserListings = async (req, res, next) => {
    try {
      const userId = req.params.id;
  
      const listings = await Listing.find({ userRef: userId });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };
  

  
  
  