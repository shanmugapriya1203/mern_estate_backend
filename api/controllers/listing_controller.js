import Listing from "../models/listing_model.js"
import { errorHandler } from './../utils/error.js';

export const createListing=async(req,res,next)=>{
    try {
        const listing= await Listing.create(req.body);
        console.log("Request body:", req.body);

        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    try {
      const listing = await Listing.findOneAndDelete({ _id: req.params.id });
  
      if (!listing) {
        return res.status(404).json({ error: 'Listing not found' });
      }
  
      return res.status(200).json({ message: 'Listing deleted' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const updateListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
  
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
  
 
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };



  
  
  