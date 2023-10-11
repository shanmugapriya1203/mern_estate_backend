import express from 'express'
import { createListing } from '../controllers/listing_controller.js'

const router= express.Router()

router.post('/create',createListing)
export default router