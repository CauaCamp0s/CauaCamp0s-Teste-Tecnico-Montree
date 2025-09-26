import express from 'express';
import ItemController from '../controllers/itemController.js';

const router = express.Router();

router.post('/', ItemController.create);
router.get('/', ItemController.list);

export default router;