const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator')
const fs = require('fs');
const userData = require('../models/user');
const authMdw = require('../middlewares/auth');
const guestMdw = require('../middlewares/guest');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imgUsers')
  },  
  filename: function (req, file, cb) {
    return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage })

const controller = require('../controllers/authController');
const { nextTick } = require('process');

router.get('/register', guestMdw, controller.register);
router.post('/register', guestMdw, upload.any(), [
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
] , controller.newUser);

router.get('/login', guestMdw, controller.login);
router.post('/login', guestMdw, [
  
  check('password').isLength({min:5}).withMessage('Ingrese un formato de contraseña válida').bail(),
  check('email').isEmail().withMessage('Ingrese un formato de email válido').custom((value, { req }) => {

    if (user = userData.findByEmail(req.body.email)){

      // Si el mail existe en nuestra base de datos, comprobamos la contraseña
      let check = bcrypt.compareSync(req.body.password, user.password);
      console.log(check);

      console.log(user.password);
      console.log(req.body.password);

      if(check){
        return true;
      }
    }
    else{
      return false;
    }
    console.log(req.body.email);
  
  }).withMessage('Datos erroneos, vuelva a intentar'),], controller.loginExistingUser);

router.get('/profile', authMdw, controller.profile);
router.post('/logOut', controller.logOut);

module.exports = router;
