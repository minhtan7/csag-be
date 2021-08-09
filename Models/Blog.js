const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogShema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogShema);
module.exports = Blog;
