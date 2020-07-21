const fs = require('fs');
const path = require('path');
const productData = require('../models/products');
const fileData = path.join(__dirname, '../data/products.json');

const db = require('../database/models');
const { Op } = require('sequelize');


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
    
    save: function (req, res){
        
        // Armamos el objeto literal
        console.log(req.params);
        
        let product = {
            id: req.params.id,
            name : req.body.name,
            description : req.body.description,
            image : req.body.image,
            category : req.body.category,
            stock : req.body.quantity,
            price : req.body.price
        } 
        
        productData.create(product);
        return res.redirect('/');
    },
    
    productList: function (req, res) {
        
        let productList = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'), { encoding: 'utf-8' }));
        
        res.render ('../../site/views/product/productList', { productList: productList})
    },
    
    index : (req, res) => {
        
        let products = []
        
        if (req.query) {
            
            db.Product.findAll({
                
                include: [
                    {association: "category"},
                    //{association: "cartProduct"}
                    ],

                where : {
                    name : {
                        [Op.like] : '%' + /*req.query.busqueda +*/ '%'
                    }
                },
                order : [
                    ['name', 'ASC']
                ]

            
            })
            .then(function(products) {
                
                return res.render('product/index', { products });
            })
        } else {
            
            let offset = 0;
            let limit = 6;
            //si me mandan la pagina entonces voy a calcular el offset
            if (req.query.page) {
                
                offset = (req.query.page - 1) * limit;
            }
        
            //sino las traigo a todas
            db.Product.findAndCountAll({
                
                order : [
                    [(req.query.order ? req.query.order : 'Name'), 'ASC']
                ],
                //esto lo useré en el paginador
                limit : limit,
                offset : offset,
                include : ['category']
            })
            .then(function(data) {
                
                const products = data.rows;
                const count = data.count;
                const pages = Math.ceil(count / limit);
                return res.render('product/index', { products, pages });
            })
            .catch(function(error){
                
            });
            //movies = moviesData.findAll();
        }
        // Trabajando con Files
        //products = productData.findAll();
        //res.render('product/index', {products});
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
