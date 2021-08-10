const express = require('express');
const router = express.Router();
// const passport = require("passport");
const validators = require('../middlewares/validators');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

/**
 * @route POST api/auth/login
 * @description Login
 * @access Public
 */
router.post('/login', authController.loginWithEmailorPhone);

module.exports = router;
