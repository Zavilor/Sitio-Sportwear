const db = require('../database/models');
const { Op } = require('sequelize');
const path = require('path');

module.exports = {

    index : (req, res) => {

        console.log("Empezamos a correr INDEX");
            
            let offset = 0;
            let limit = 30;
            //si me mandan la pagina entonces voy a calcular el offset
            if (req.query.page) {
                
                offset = (req.query.page - 1) * limit;
            }
            
            //sino las traigo a todas
            db.ShoppingCart.findAndCountAll({
                
                order : [
                    [(req.query.order ? req.query.order : 'Date'), 'DESC']
                ],
                //esto lo useré en el paginador
                limit : limit,
                offset : offset,
                include : ['user', 'product']

          //
            })

            .then(function(data) {
                
                const shoppingCart = data.rows;
                const count = data.count;
                const pages = Math.ceil(count / limit);

                console.log(shoppingCart[0].state);

                return res.render('shoppingCart/cart', { shoppingCart, pages });


            })
            .catch(function(error){
                console.log(error);
            });
    },

    //add: 
    
    /*async (req, res) => {
        let uno = await db.Products.findByPk(req.params.id);
        let dos = await db.Users.findByPk(res.locals.logeado.id);
        uno.addProductsusers(dos);
        res.redirect ('cart/index');

    }*/

}

// res.render ('../../site/views/shoppingCart/cart')