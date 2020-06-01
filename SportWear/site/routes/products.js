const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/', controller.productList);
router.get('/create', controller.create);
router.get('/cart' , controller.cart);
router.get('/detail', controller.detail)


module.exports = router;