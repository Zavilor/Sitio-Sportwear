var express = require('express');
var router = express.Router();

const controller = require('../../controllers/indexController');

router.get('/', controller.index);
router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/product/add', controller.product);
router.get('/carrito' , controller.carrito);
router.get('/product/detail', controller.detail)

module.exports = router;
