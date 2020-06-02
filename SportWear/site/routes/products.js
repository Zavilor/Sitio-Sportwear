const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/', controller.index);
router.get('/create', controller.create);
router.get('/:id?', controller.detail);

module.exports = router;