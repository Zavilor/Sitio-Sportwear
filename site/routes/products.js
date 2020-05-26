var express = require('express');
var router = express.Router();

const controllerProd = require('../../controllers/productController');

router.get('/product/add', controllerProd.product);
router.get('/carrito' , controllerProd.carrito);
router.get('/product/detail', controllerProd.detail)

module.exports = router;