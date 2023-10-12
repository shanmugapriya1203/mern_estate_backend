import express from 'express'
import { createListing, deleteListing, updateListing } from '../controllers/listing_controller.js'


const router= express.Router()

router.post('/create',createListing)
router.delete('/delete/:id',deleteListing)
router.post('/edit/:id',updateListing)
export default router