const express = require("express");
const formController = require("../controllers/form.controller");

const router = express.Router();

/**
 * @route POST api/item
 * @description Create item
 * @acces Public
 *
 */
router.post("/", formController.createForm);






module.exports = router;
