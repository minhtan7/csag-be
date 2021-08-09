const utilsHelper = require("../helpers/utils.helper");
const Blog = require("../Models/Blog");

const blogController = {};

blogController.getAllBlogs = async (req, res, next) => {
  try {
    //page, limit   /api/blogs
    let { page, limit } = req.query; //{page: undifined, limit: undefined}
    page = parseInt(page)
    limit = parseInt(limit)

    if (!page) page = 1;
    if (!limit) limit = 10;

    //total number of blogs
    const totalBlog = await Blog.find({ isDeleted: false }).countDocuments();

    //totalpage
    const totalPage = Math.ceil(totalBlog / limit);

    //offset
    const offset = limit * (page - 1);

    //find a number of blogs form database
    const blogs = await Blog.find({ isDeleted: false })
      .limit(limit)
      .skip(offset);

    //send

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { blogs, totalPage, totalBlog },
      null,
      "Get all blogs"
    );
  } catch (error) {
    next(error);
  }
};

blogController.getSingleBlog = async (req, res, next) => {
  try {
    //take content from fontedn
    const { id } = req.params;
    console.log(id)
    //create new blog
    const blog = await Blog.findById(id);
    console.log(blog)
    //send
    utilsHelper.sendResponse(res, 200, true, {blog}, null, "Get single blog");
  } catch (error) {
    next(error);
  }
};

blogController.createBlog = async (req, res, next) => {
  try {
    //take content from fontedn
    const { title, content, author } = req.body;
    //create new blog
    const blog = await Blog.create({
      title,
      content,
      author,
    });
    //send
    utilsHelper.sendResponse(res, 200, true, blog, null, "Create new blog");
  } catch (error) {
    next(error);
  }
};

blogController.updateBlog = async (req, res, next) => {
  try {
    //take content from fontedn
    const { title, content, author } = req.body;
    const { id } = req.params;
    //create new blog
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        author,
      },
      { new: true }
    );
    //send
    utilsHelper.sendResponse(res, 200, true, blog, null, "Update blog");
  } catch (error) {
    next(error);
  }
};

blogController.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true }
    );
    //send
    utilsHelper.sendResponse(res, 200, true, null, null, "Delete blog");
  } catch (error) {
    next(error);
  }
};

module.exports = blogController;
