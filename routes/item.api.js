const express = require("express");
const itemController = require("../controllers/item.controller");
const router = express.Router();

/**
 * @route POST api/item
 * @description Create item
 * @acces Public
 *
 */
router.post("/", itemController.createItem);

module.exports = router;
