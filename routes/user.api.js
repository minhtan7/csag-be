const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @route POST api/users
 * @description User register account
 * @acces Public
 *
 */
router.post("/", userController.register);

/**
 * @route POST api/users
 * @description User register account
 * @acces Public
 *
 */
router.get("/", userController.getAllUsers);

module.exports = router;
