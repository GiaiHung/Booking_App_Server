import express from 'express'
import { put, get, getAll, deleteUser } from '../controllers/usersController.js'
import { verifyUser, verifyToken } from '../utils/verify.js'

const router = express.Router()

router.put('/:id', verifyUser, put)

router.get('/:id', verifyToken, get)
router.get('/', verifyToken, getAll)

router.delete('/:id', verifyUser, deleteUser)

export default router
