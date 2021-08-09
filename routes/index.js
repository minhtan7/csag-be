var express = require("express");
var router = express.Router();

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

module.exports = router;
