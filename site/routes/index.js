var express = require('express');
var router = express.Router();

const controller = require('../../controllers/indexController');

router.get('/', controller.index);
router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/product/add', controller.productAdd);
router.get('/product/cart' , controller.carrito);
router.get('/product/detail', controller.detail)
router.get('/product', controller.productList);

module.exports = router;
