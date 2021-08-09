const Catagory = require("../Models/Catagory");
const Item = require("../Models/Item");
const User = require("../Models/User");
const itemController = {};

itemController.createItem = async (req, res, next) => {
  try {
    let { item, status, userId } = req.body;
    userId = await User.findById(userId).populate("User");
    let catagories = await Catagory.findById().populate("Catagory");
    let products = await Item.create({
      userId,
      item,
      status,
    });
    res.status(200).json({
      success: true,
      data: products,
      message: `products list created`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = itemController;
