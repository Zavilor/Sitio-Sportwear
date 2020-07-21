const {body,check} = require('express-validator');
const userData = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');
module.exports = 
    
[
  
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
    
    }).withMessage('Datos erroneos, vuelva a intentar'),]