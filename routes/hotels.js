import express from 'express';
import hotelsController from '../controllers/hotelsController.js';

const router = express.Router()

router.get('/', hotelsController)

export default router