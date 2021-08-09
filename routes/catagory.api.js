const express = require("express");
const catagoryController = require("../controllers/catagory.controller");
const router = express.Router();

/**
 * @route POST api/catagory
 * @description Create catagory
 * @acces Admin required
 *
 */
router.post("/", catagoryController.createCatagory);

module.exports = router;
