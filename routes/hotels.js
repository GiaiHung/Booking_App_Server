import express from 'express'
import {
  create,
  put,
  get,
  getAll,
  deleteHotel,
  countByCity,
  countByType,
} from '../controllers/hotelsController.js'
import { verifyAdmin } from '../utils/verify.js'

const router = express.Router()

router.post('/', verifyAdmin, create)

router.put('/:id', verifyAdmin, put)

router.get('/countByCity', countByCity)
router.get('/countByType', countByType)

router.get('/', getAll)
router.get('/:id', get)

router.delete('/:id', verifyAdmin, deleteHotel)

export default router
