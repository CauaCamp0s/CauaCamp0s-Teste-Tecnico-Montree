import express from 'express';
import CompraController from '../controllers/compraController.js';

const router = express.Router();

router.post('/', CompraController.create);
router.get('/', CompraController.list);

export default router;
