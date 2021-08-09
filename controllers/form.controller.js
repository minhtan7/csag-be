const Form = require("../Models/Form");
const User = require("../Models/User");
const formController = {};

formController.createForm = async (req, res, next) => {
  try {
    let { item, status, userId } = req.body;
    userId = await User.findById(userId).populate("User");

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

module.exports = formController;
