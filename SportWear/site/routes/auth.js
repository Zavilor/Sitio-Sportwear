const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const fs = require('fs');
const userData = require('../models/user');
const authMdw = require('../middlewares/auth');
const guestMdw = require('../middlewares/guest');
const userLoginMdw = require('../middlewares/userLogin');
const userCreateMdw = require('../middlewares/userCreate');
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
router.post('/register', guestMdw, upload.any(), userCreateMdw, controller.newUser);

router.get('/login', guestMdw, controller.login);
router.post('/login', guestMdw, userLoginMdw, controller.loginExistingUser);

router.get('/profile', authMdw, controller.profile);
router.post('/logOut', controller.logOut);

module.exports = router;
