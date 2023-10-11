import express from 'express'
import {deleteUserById, test, updateUser} from '../controllers/user_controller.js'




const router= express.Router()

router.get('/test',test)
router.post('/update/:id',  updateUser)
router.delete('/delete/:id',deleteUserById)
export default router