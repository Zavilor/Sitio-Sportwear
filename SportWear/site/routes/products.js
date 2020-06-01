const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/', controller.productList);
router.get('/create', controller.create);
//router.get('/detail', controller.detail);
router.get('/:id', controller.detail);

module.exports = router;