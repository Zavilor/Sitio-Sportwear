const {body,check} = require('express-validator');
const userData = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');
module.exports = 
    
[
    check('name').isLength({min: 1}).withMessage('El usuario a registrar debe tener un nombre'),
    check('apellido').isLength({min: 1}).withMessage('El usuario a registrar debe tener un apellido'),
    check('email').isEmail().withMessage('El email debe ser valido'),
    body('email').custom(function (value) {
      
      let users = userData.findAll();
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == value) {
          return false;
        }
      }
      return true;
    }).withMessage('El email ya está registrado'),
    check('password').isLength({min:5}).withMessage('La contraseña debe contener 5 caracteres como minimo'),
    check('password', 'Las contraseñas no coinciden')
    .custom((value, { req }) => {
      return value === req.body.confirmarPassword
    })
]