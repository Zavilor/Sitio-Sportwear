const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const userData = require('../models/user');
const loginService = require('../services/loginService');
const tokenService = require('../services/tokenService');

const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    register: function (req, res) {
        res.render ('auth/register')
    },
    
    newUser: function (req, res, next) {
        
        const errors= validationResult(req);
        
        if (!errors.isEmpty()) {
            
            return res.render('auth/register', {errors: errors.errors})
            
        }
        
        let avatar = '';
        
        if (req.files[0]) {
            
            avatar = '/imgUsers/' + req.files[0].filename;
            
        }
        
        
        //Genero el objeto user
        let user = {
            
            name: req.body.name,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 5),
            avatar: avatar,
            idRol : 3,
        }            
        
        db.User.create(user)
        .then(function(){
            return res.redirect('/auth/login');
        }).catch(function(error){
            console.log(error);
            return res.redirect('/');
        })   
    },
    
    login: async function (req, res) {
        res.render ('auth/login')
    },
    
    loginExistingUser: function(req, res) {
        
        let errors = validationResult(req)
        //console.log(validation.mapped());
        
        if (!errors.isEmpty()) {
            //return res.send(validation.mapped());
            return res.render('auth/login', {errors: errors.errors});
        }
        
        db.User.findOne({where : {email : req.body.email}})
        .then(async (user) => {
            if (req.body.rememberMe){
                
                //await tokenService.generateToken(res, user):
                res.cookie('recordame', req.body.email, {expires: new Date(Date.now() + 1000*60*60*24*90)});
            }
            
            req.session.logeado = true
            req.session.locals = true
            req.session.userEmail = req.body.email
            req.session.userId = req.params.id

            loginService.loginUser(req, res, user);
            return res.redirect('/');
        }).catch((error) => {
            console.error(error);
            return res.redirect('login');
        })
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
        
        let rol = db.Rol.findAll();

        let userEmail = req.session.userEmail
        
        let userLogueado = db.User.findOne({

            where : {
                email : userEmail
            }
        })
        Promise.all([rol, userLogueado])
        .then(function(datos){

            //const userRol = user.idRol;
            return res.render('auth/profile', {userLogueado : datos[1], rol : datos[0]});
        });
        
    },


    formEdit : (req, res) => {

        let userEmail = req.session.userEmail;

        console.log("MOSTRAMOS EL USEREMAIL");
        console.log(userEmail);

        let userLogueado = db.User.findOne({

            where : {
                email : userEmail
            }
        })

        Promise.all([userLogueado])
        .then(function(datos){
            
            return res.render('auth/formEdit',{userLogueado : datos[0]});
        })
        .catch(function(error){
            console.log(error);
        })
        
    },

    update : async (req, res) => {

        let userEmail = req.session.userEmail;

        let user = await db.User.findOne({

            where : {
                email : userEmail
            }
        })

        user.name = req.body.name;
        user.apellido = req.body.apellido;

        if (req.file) {

            user.avatar = req.file.filename;
        }
    
        console.log("Ejecutamos el update");
        await user.save();

        res.redirect('/auth/login')
    }
}

