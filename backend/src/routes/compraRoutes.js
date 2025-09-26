const express = require('express');
const CompraController = require('../controllers/compraController');

const router = express.Router();

router.post('/', CompraController.create);
router.get('/', CompraController.list);

module.exports = router;
