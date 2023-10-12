import express from 'express'
import {deleteUserById, getUserListings, test, updateUser} from '../controllers/user_controller.js'
import { verifyToken } from '../middleware.js'




const router= express.Router()

router.get('/test',test)
router.post('/update/:id',   verifyToken,updateUser)
router.delete('/delete/:id', verifyToken, deleteUserById)
router.get('/listing/:id',  verifyToken,getUserListings)
export default router