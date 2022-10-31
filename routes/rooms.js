import express from 'express';
import roomsController from '../controllers/roomsController.js';

const router = express.Router()

router.get('/', roomsController)

export default router