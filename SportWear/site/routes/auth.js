const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator')
const fs = require('fs');
const userData = require('../models/user');
const authMdw = require('../middlewares/auth');
const guestMdw = require('../middlewares/guest');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imgUsers')
  },  
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
 
var upload = multer({ storage: storage })


const controller = require('../controllers/authController');

router.get('/register', guestMdw, controller.register);
router.post('/register', guestMdw, upload.any(), [
    check('name').isLength({min: 1}).withMessage('El usuario a registrar debe tener un nombre'),
    check('apellido').isLength({min: 1}).withMessage('El usuario a registrar debe tener un apellido'),
    check('email').isEmail().withMessage('El email debe ser valido'),
    check('password').isLength({min:5}).withMessage('La contraseña debe contener 5 caracteres como minimo')   
] , controller.newUser);
router.get('/login', guestMdw, controller.login);
router.post('/login', guestMdw, 
/*[
    check('password').isLength({min:5})
        .withMessage('Contraseña incorrecta').bail(),
    check('email').isEmail()
        .withMessage('Email invalido')
        .custom((value, { req }) => {
            return userData.findOne({where :{email : value}}).then(user => {
                if (user == null) {
                    return Promise.reject('Email invalido');
                } else if (user && !bcrypt.compareSync(req.body.password , user.password)) {
                    return Promise.reject('Contraseña erronea');
                }
            })
        }),
        
],*/ controller.loginExistingUser);
router.get('/profile', authMdw)

module.exports = router;
    