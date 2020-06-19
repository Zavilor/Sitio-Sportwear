const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator')
const fs = require('fs');
const userData = require('../models/user');
const multer = require('multer');
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/imgusers')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  var upload = multer({ storage: storage })



const controller = require('../controllers/authController');

router.get('/register', controller.register);
router.post('/register', upload.any(), [
    check('name').isLength({min: 1}).withMessage('El usuario a registrar debe tener un nombre'),
    check('apellido').isLength({min: 1}).withMessage('El usuario a registrar debe tener un apellido'),
    check('email').isEmail().withMessage('El email debe ser valido'),
    check('password').isLength({min:5}).withMessage('La contraseña debe contener 5 caracteres como minimo')   
] ,controller.newUser);
router.get('/login', controller.login);
router.post('/login', controller.loginExistingUser);

module.exports = router;
