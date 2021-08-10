const express = require("express");
const formController = require("../controllers/form.controller");
const authMiddleware = require("../middlewares/authentication");

const router = express.Router();

/**
 * @route POST api/form/
 * @description Create item
 * @acces Public
 *
 */
router.post("/", formController.createForm);

/**
 * @route GET api/form/matching
 * @description get matched forms
 * @acces giver
 *
 */
// router.get(
//   "/matching",
//   authMiddleware.loginRequired,
//   formController.matchingReceiver
// );

module.exports = router;
