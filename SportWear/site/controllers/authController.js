const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const userData = require('../models/user');

module.exports = {
    register: function (req, res) {
        res.render ('auth/register')
    },
    
    newUser: function (req, res, next) {
        let errors= validationResult(req);
        
        if (errors.isEmpty()) {
            
            let avatar = '';
            if (req.files[0]) {
                console.log("Muestro el path antes de reemplazar");
                console.log(req.files[0].path);
                avatar = req.files[0].path.replace('public\\imgUsers\\','/imgUsers/')
                console.log("Muestro el path desp de reemplazar");
                console.log(req.files[0].path);
            }
            
            
            //Genero el objeto user
            let user = {
                name: req.body.name,
                apellido: req.body.apellido,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 5),
                //avatar: avatar
            }            
            userData.create(user)
            if (user) {
                //TODO: que logee al usuario y muestre la pagina del perfil
                res.locals.logeado = true;
                req.session.logeado = true;
                req.session.userEmail = user.email;
                //enviar a otro html que se registro exitosamente
                res.redirect('/auth/profile')
            }             
                   
        } else {
            res.render('auth/register', {errors: errors.errors})
        }
    },
    
    login: function (req, res) {
        res.render ('../../site/views/auth/login')
    },
    
    loginExistingUser: function(req, res) {
        
        let errors = validationResult(req)
        //console.log(validation.mapped());
        
        if (!errors.isEmpty()) {
            //return res.send(validation.mapped());
            return res.render('auth/login', {errors: errors.errors});
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
    },
    
    logOut: function(req, res){

        console.log("intentando desloguearse");
        
        if (req.session){
            let date = new Date(Date.now() - 100);
            req.session.cookie.expires = date;
            req.session.cookie.maxAge = -100;      
        }
        res.redirect('/')
    },
    
    
    profile : function (req, res) {
        console.log(req.session);
        let user = req.session.userEmail;
        console.log(user)
        
        let users = userData.findAll();
        
        let userLogeado = users.find(function(usuario){
            return user == usuario.email;
        });
        console.log(userLogeado);
    
        res.render('auth/profile', { userLogeado : userLogeado });
    }
    
}

