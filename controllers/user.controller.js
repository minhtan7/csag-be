const User = require("../Models/User");
const userController = {};
const bcrypt = require("bcrypt");
userController.register = async (req, res, next) => {
  try {
    let {
      name,
      email,
      deliveryMethod,
      role,
      address,
      images,
      password,
    } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({
      name,
      email,
      password,
      deliveryMethod,
      role,
      address,
      images,
    });

    res.status(200).json({
      success: true,
      data: user,
      message: `user ${user.name} created`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

userController.getAllUsers = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalUsers = await User.count({
      ...filter,
    });
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = limit * (page - 1);

    let users = await User.find()
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      success: true,
      data: { users, totalPages },
      message: `Get users Success`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

userController.getGiver = async (req, res, next) => {
  try {
    let { page, limit, sortBy } = { ...req.query };

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalUsers = await User.count({
      role: "giver",
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = limit * (page - 1);

    let users = await User.find({
      role: "giver",
      isDeleted: false,
    })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      success: true,
      data: { users, totalPages },
      message: `Get giver Success`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

userController.getRecipient = async (req, res, next) => {
  try {
    let { page, limit, sortBy } = { ...req.query };

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalUsers = await User.count({
      role: "recipient",
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = limit * (page - 1);

    let users = await User.find({
      role: "recipient",
      isDeleted: false,
    })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      success: true,
      data: { users, totalPages },
      message: `Get recipient Success`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

userController.getShipper = async (req, res, next) => {
  try {
    let { page, limit, sortBy } = { ...req.query };

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalUsers = await User.count({
      role: "shipper",
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = limit * (page - 1);

    let users = await User.find({
      role: "shipper",
      isDeleted: false,
    })
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      success: true,
      data: { users, totalPages },
      message: `Get shipper Success`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = userController;
