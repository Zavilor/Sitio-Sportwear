const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const userData = require('../models/user');
//const multer = require ('multer')

module.exports = {
    register: function (req, res) {
        res.render ('../../site/views/auth/register')
    },

    newUser: function (req, res, next) {
        let errors= validationResult(req);

        if (errors.isEmpty()) {
            let user = {
                name: req.body.name,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 5),
                avatar: req.files[0].filename
            }            
                userData.create(user)
                if (user) {
                    //TODO: que logee al usuario y muestre la pagina del perfil
                    res.locals.logeado = true;
                    req.session.logeado = true;
                    req.session.userEmail = user.email;
                    //enviar a otro html que se registro exitosamente
                    res.redirect('/profile')
                } else {

                }
        
            /* ACA BORRE ALGO QUE COPIE DEL ARCHIVO DE DIGITAL MOVIES XQ HAY UN "THEN" QUE NO ANDA
            .catch(function(error){
                console.error(error);
                //TO-DO make error general in an div, res.locals....
                return res.redirect('/auth/register', {errors: errors.errors})
            })*/
            //.then(function(){
                //TODO: que logee al usuario y muestre la pagina del perfil
                //res.locals.logeado = true;
                //req.session.logeado = true;
                //req.session.userEmail = user.email;

            //res.send('Usuario ' + req.body.name + ' registrado con exito');
            //res.redirect('/profile')
            //})

        } else {
            res.render('auth/register', {errors: errors.errors})
        }
    },

    login: function (req, res) {
        res.render ('../../site/views/auth/login')
    },

    loginExistingUser: function(req, res) {

        let validation = validationResult(req)
        //console.log(validation.mapped());

        if (!validation.isEmpty()) {
            //return res.send(validation.mapped());
            return res.render('auth/login', {errors : validation.mapped(), body : req.body});
        }

        if (req.body.rememberMe) {
            res.cookie('recordame', req.body.email, {expires: new Date(Date.now() + 1000*60*60*24*90)});
        }   
        
        req.session.logeado = true
        req.session.locals = true
        req.session.userEmail = req.body.email

        console.log('me estoy logeando');
        return res.redirect('/')

        /*let email = req.body.email;
        res.send('Usuario ' + email + ' se ha logueado con éxito');
        res.redirect ('../../site/views/auth/register')*/
    }
}