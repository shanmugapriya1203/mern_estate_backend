import express from 'express'
import {test, updateUser} from '../controllers/user_controller.js'




const router= express.Router()

router.get('/test',test)
router.post('/update/:id',  updateUser)
export default router