const express = require('express');
const ItemController = require('../controllers/itemController');

const router = express.Router();

router.post('/', ItemController.create);
router.get('/', ItemController.list);

module.exports = router;