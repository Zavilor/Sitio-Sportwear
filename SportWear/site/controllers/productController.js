const fs = require('fs');
const path = require('path');

module.exports = {

    create: function (req, res) {
        res.render ('../../site/views/product/create')
    },

    cart: function (req, res) {
        res.render ('../../site/views/product/productCart')
    },

    detail: function (req, res) {
        res.render ('../../site/views/product/productDetail')
    },

    productList: function (req, res) {

        let productList = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'), { encoding: 'utf-8' }));
       
        res.render ('../../site/views/product/productList', { productList: productList})
    },

    detail2 : (req, res) => {
        
        let pelis = moviesData.findAll();

        let pelicula = pelis.find(function (peli) {
            return req.params.id == peli.id;
        });
        
        res.render('movies/detail', {
            pelicula : pelicula
            });
    }


}
