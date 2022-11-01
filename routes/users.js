import express from 'express'
import { put, get, getAll, deleteUser } from '../controllers/usersController.js'
import { verifyUser, verifyAdmin } from '../utils/verify.js'

const router = express.Router()

router.put('/:id', verifyUser, put)

router.get('/:id', verifyUser, get)
router.get('/', verifyAdmin, getAll)

router.delete('/:id', verifyUser, deleteUser)

export default router
