import express from 'express'
import { create, deleteRoom, put, get, getAll, updateRoomAvailability } from '../controllers/roomsController.js'
import { verifyAdmin } from '../utils/verify.js'

const router = express.Router()

router.post('/:hotelId', verifyAdmin, create)

router.put('/availability/:id', updateRoomAvailability)
router.put('/:id', verifyAdmin, put)

router.get('/:id', get)
router.get('/', getAll)

router.delete('/:hotelId/:id', verifyAdmin, deleteRoom)

export default router
