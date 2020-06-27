const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController');
const publishMdw = require('../middlewares/publish')
router.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});

router.get('/', controller.index);

// Formulario de creacion de producto
router.get('/create', publishMdw, controller.create);
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