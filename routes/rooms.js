import express from 'express'
import { create, deleteRoom, put, get, getAll } from '../controllers/roomsController.js'
import { verifyAdmin } from '../utils/verify.js'

const router = express.Router()

router.post('/:hotelId', verifyAdmin, create)

router.put('/:id', verifyAdmin, put)

router.get('/:id', get)
router.get('/', getAll)

router.delete('/:hotelId/:id', verifyAdmin, deleteRoom)

export default router
