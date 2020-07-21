const fs = require('fs');
const path = require('path');
const { check, validationResult, body } = require('express-validator');
const productData = require('../models/products');
const fileData = path.join(__dirname, '../data/products.json');

module.exports = {
    
    create: function (req, res) {
        res.render ('product/create')
    },
    
    newProduct: function (req, res){
        res.send('Producto agregado exitosamente, en unos instantes podrá ver su publicación');
    },
    
    cart: function (req, res) {
        res.render ('product/productCart')
    },
    
    save: function (req, res, next){

        let errors= validationResult(req);

        if (errors.isEmpty()) {

            let image = '';
            if (req.files[0]) {
                image = '/imgProds/' + req.files.filename
                console.log(image)
            }
        
         // Armamos el objeto literal
                    
            let product = {
                id: req.params.id,
                name : req.body.name,
                description : req.body.description,
                image : image,
                category : req.body.category,
                stock : req.body.quantity,
                price : req.body.price
            } 
        
            productData.create(product);
            return res.redirect('/');
        } else {
            res.render('product/create', {errors: errors.errors})
        }
    },
    
    productList: function (req, res) {
        
        let productList = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'), { encoding: 'utf-8' }));
        
        res.render ('../../site/views/product/productList', { productList: productList})
    },
    
    index : (req, res) => {
        
        let products = []
        products = productData.findAll();
        res.render('product/index', {products});
    },
    
    detail : (req, res) => {
        
        let products = productData.findAll();
        
        let product = products.find(function (products) {
            
            return req.params.id == products.id;
        });
        
        res.render('product/detail', {
            product : product
        });
    },
    
    edit : (req, res) => {
        
        // validamos que existe el id que pasó la url
        let productId = req.params.id;
        
        // pedirle al modelo que busque el producto
        let findedProduct = productData.findId(productId);
        
        res.render('product/edit', {
            product : findedProduct
        });
    },
    
    update : (req, res) => {
        
        // busco el producto a editar
        let productId = req.params.id;
        let product = productData.findId(productId);
        
        // Seteamos los nuevos atributos
        product.name = req.body.name;
        product.description = req.body.description;
        product.image = req.body.image;
        product.category = req.body.category;
        product.stock = req.body.stock;
        product.price = req.body.price;
        
        // Le pedimos al modelo que impacte la actualización en el JSON
        productData.update(product);
        
        // Redireccionamos la vista
        res.redirect('/');
    },
    
    delete: (req, res) => {
        
        // validamos que existe el id que pasó la url
        let productId = req.params.id;
        
        // pedirle al modelo que busque el producto
        let findedProduct = productData.findId(productId);
        
        // Le pedimos al modelo que finalmente lo borre y modifique el JSON
        productData.delete(findedProduct);
        
        // Redireccionamos la vista
        res.redirect('/product');
    }
    
    
    
}
