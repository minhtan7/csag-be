const Form = require("../Models/Form");
const User = require("../Models/User");
const formController = {};

formController.createForm = async (req, res, next) => {
  try {
    const userId = req.userId;
    let { items, status, type } = req.body;

    let products = await Form.create({
      userId: userId,
      items,
      status,
      type,
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
