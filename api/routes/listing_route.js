import express from 'express'
import { createListing, deleteListing, updateListing,getListing, getListings } from '../controllers/listing_controller.js'


const router= express.Router()

router.post('/create',createListing)
router.delete('/delete/:id',deleteListing)
router.post('/edit/:id',updateListing)
router.get('/get/:id',getListing)
router.get('/get',getListings)
export default router