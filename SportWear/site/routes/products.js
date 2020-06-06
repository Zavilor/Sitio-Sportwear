const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');

router.get('/', controller.index);

// Formulario de creacion de producto
router.get('/create', controller.create);
// Guardamos la publicación
router.post('/', controller.save);

// Nos muestra el detalle del producto que llega por parametro
router.get('/:id?', controller.detail);

// Nos lleva al formulario de edición del producto que mandemos por parametro
router.get('/:id/edit', controller.edit);
// Actualizar el producto editado
router.put('/:id', controller.update);

// Eliminar el producto que mandamos por parametro
router.delete('/:id', controller.delete);

module.exports = router;