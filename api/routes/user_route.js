import express from 'express'
import {deleteUserById, getUser, getUserListings, test, updateUser} from '../controllers/user_controller.js'





const router= express.Router()

router.get('/test',test)
router.post('/update/:id',   updateUser)
router.delete('/delete/:id',  deleteUserById)
router.get('/listing/:id',getUserListings)
router.get('/:id',getUser)
export default router