const User = require("../Models/User");
const userController = {};

userController.register = async (req, res, next) => {
  try {
    let { name, email, deliveryMethod, role, address, images } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }

    user = await User.create({
      name,
      email,
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

userController.getUsers = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalUsers = await User.count({
      ...filter,
      isDeleted: false,
    });
    const totalPages = Math.ceil(totalUsers / limit);
    const offset = limit * (page - 1);

    let users = await User.find(filter)
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

module.exports = userController;
