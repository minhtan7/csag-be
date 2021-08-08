var express = require("express");
var router = express.Router();

/* Blog */
const blogApi = require("./blog.api");
router.use("/blogs", blogApi);

module.exports = router;
