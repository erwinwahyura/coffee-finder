'use strict'
const express = require('express');
const router = express.Router();
var controller = require('../controllers/userRegisController')

/* GET main endpoint. */
router.post('/signUp', controller.userSignUp);
router.post('/signIn', controller.userSignIn);
router.post('/signInFB', controller.signInFB);
router.get('/allUsers', controller.getAllUser);


module.exports = router;
