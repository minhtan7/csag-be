var express = require("express");
const blogController = require("../controllers/blog.controller");
var router = express.Router();

/**
 * @path GET /api/blogs?page=2&limit=10&search=gao
 * @description get all blogs
 * @access Public
 */
router.get("/", blogController.getAllBlogs);
/**
 * @path POST /api/blogs
 * @description create new blog
 * @access admin
 */
router.post("/", blogController.createBlog);

/**
 * @path PUT /api/blogs/:id
 * @description update the blog
 * @access admin
 */
router.put("/:id", blogController.updateBlog);

/**
 * @path DELETE /api/blogs/:id
 * @description delete the blog
 * @access admin
 */

router.delete("/:id", blogController.deleteBlog);

module.exports = router;
