var express = require("express");
var router = express.Router();

//// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

/* Blog */
const blogApi = require("./blog.api");
router.use("/blogs", blogApi);

/* shipmentApi  */
const shipmentApi = require("./shipment.api");
router.use("/shipment", shipmentApi);

/* userApi  */
const userApi = require("./user.api");
router.use("/users", userApi);

/* formApi */
const formApi = require("./form.api");
router.use("/form", formApi);

/* orderApi */
const orderApi = require("./order.api");
router.use("/orders", orderApi);

module.exports = router;
