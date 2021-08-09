const Catagory = require("../Models/Catagory");

const catagoryController = {};

catagoryController.createCatagory = async (req, res, next) => {
  try {
    let { group, name, unit } = req.body;
    let catagory = await Catagory.create({
      group,
      name,
      unit,
    });
    res.status(200).json({
      success: true,
      data: catagory,
      message: `Catagory list created`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = catagoryController;
