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


  export const getListing=async(req,res,next)=>{
    try {
      const listing= await Listing.findById(req.params.id)
      if(!listing){
        return next(errorHandler(404,'Listing not found'))
      }
      res.status(200).json(listing)
    } catch (error) {
      next(error)
    }
  }

  export const getListings= async(req,res,next)=>{
    try {
   const limit= parseInt(req.query.limit) || 9;
   const startIndex= parseInt(req.query.startIndex) || 0;
   let offer= req.query.offer;
   if(offer === undefined || offer ==='false'){
    offer={ $in:[false,true]}
   }

   let furnished= req.query.furnished;
   if(furnished ===undefined|| furnished==='false'){
    furnished={$in:[false,true]}
   }


  let parking=req.query.parking;
  if(parking ===undefined || parking==='false'){
    parking={ $in:[false,true]}
  }

  let type= req.query.type;
  if(type===undefined|| type==='all'){
    type={ $in:['sale','rent']}
  }

  const searchTerm= req.query.searchTerm || '';
  const sort= req.query.sort || 'createdAt';
  const order= req.query.order || 'desc';
  const listings= await Listing.find({
    name:{
      $regex:searchTerm, $options:'i'
    },
    offer,
    furnished,
    parking,
    type
  }).sort(
    {
      [sort]:order
    }
  ).limit(limit).skip(startIndex)
  return res.status(200).json(listings)









    } catch (error) {
      next(error)
    }
  }
  
  
  