const fs = require('fs');
const path = require('path');
const productData = require('../models/products');

module.exports = {

    create: function (req, res) {
        res.render ('../../site/views/product/create')
    },

    newProduct: function (req, res){
        res.send('Producto agregado exitosamente, en unos instantes podrá ver su publicación');
    },

    cart: function (req, res) {
        res.render ('../../site/views/product/productCart')
    },

    /*detail: function (req, res) {
        res.render ('../../site/views/product/productDetail')
    },*/

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
        
        res.render('product/productDetail', {
            product : product
            });
    } 


}
