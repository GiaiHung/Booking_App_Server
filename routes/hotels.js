import express from 'express'
import { create, put, get, getAll, deleteHotel } from '../controllers/hotelsController.js'
import { verifyAdmin } from '../utils/verify.js'

const router = express.Router()

router.post('/', verifyAdmin, create)

router.put('/:id', verifyAdmin, put)

router.get('/:id', get)
router.get('/', getAll)

router.delete('/:id', verifyAdmin, deleteHotel)

export default router
