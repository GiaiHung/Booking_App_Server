import express from 'express';
import hotelsController from '../controllers/hotelsController.js';

const router = express.Router()

router.post('/', hotelsController.create)

router.put('/:id', hotelsController.put)

router.get('/:id', hotelsController.get)
router.get('/', hotelsController.getAll)

router.delete('/:id', hotelsController.delete)

export default router