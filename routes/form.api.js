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
router.post("/", authMiddleware.loginRequired, formController.createForm);

/**
 * @route GET api/form/matching
 * @description get matched forms
 * @acces giver
 *
 */
router.get(
  "/matching/:id",
  authMiddleware.loginRequired,
  formController.matchingReceiver
);
/**
 * @route GET api/form/:id
 * @description get form by id
 * @acces giver
 *
 */
router.get("/:id", authMiddleware.loginRequired, formController.getSingleForm);

module.exports = router;
