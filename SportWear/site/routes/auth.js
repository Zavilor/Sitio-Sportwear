const express = require('express');
const router = express.Router();

const controller = require('../controllers/authController');

router.get('/register', controller.register);
router.post('/register', controller.newUser);
router.get('/login', controller.login);
router.post('/login', controller.loginExistingUser);

module.exports = router;
