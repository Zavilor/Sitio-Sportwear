const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator')
const fs = require('fs');
const userData = require('../models/user');


const controller = require('../controllers/authController');

router.get('/register', controller.register);
router.post('/register',[
    check('name').isLength({min: 1}).withMessage('El usuario a registrar debe tener un nombre'),
    check('apellido').isLength({min: 1}).withMessage('El usuario a registrar debe tener un apellido'),
    check('email').isEmail().withMessage('El email debe ser valido'),
    check('password').isLength({min:5}).withMessage('La contraseña debe contener 5 caracteres como minimo')   
] ,controller.newUser);
router.get('/login', controller.login);
router.post('/login', controller.loginExistingUser);

module.exports = router;
