const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.newProduct);
router.get('/:id?', controller.detail);
router.get('/edit/:id', controller.edit)

module.exports = router;