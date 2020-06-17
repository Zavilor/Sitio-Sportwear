const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const userData = require('../models/user');


module.exports = {
    register: function (req, res) {
        res.render ('../../site/views/auth/register')
    },

    newUser: function (req, res) {
        let errors= validationResult(req);

        if (errors.isEmpty()) {
            let user = {
                name: req.body.name,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 5)
            }

            userData.create(user);
            res.send('Usuario ' + req.body.name + ' registrado con exito');
            //res.redirect('/')

        } else {
            res.render('auth/register', {errors: errors.errors})
        }
    },

    login: function (req, res) {
        res.render ('../../site/views/auth/login')
    },

    loginExistingUser: function(req, res, next){
        let email = req.body.email;
        res.send('Usuario ' + email + ' se ha logueado con éxito');
        /*res.redirect ('../../site/views/auth/register')*/
    }
}
    