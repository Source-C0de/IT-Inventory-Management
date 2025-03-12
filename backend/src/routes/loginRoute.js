
const express = require('express');

const {login, addUser, updatePass} = require('../controller/loginController');
// const { updatePassword } = require('../models/UserModel');

const router = express.Router();


router.post('/login', login);
router.post('/addUser',addUser);
router.post('/updatePass',updatePass);

module.exports = router;
