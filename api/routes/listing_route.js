import express from 'express'
import { createListing } from '../controllers/listing_controller'

const router= express.Router()

router.post('/create',createListing)