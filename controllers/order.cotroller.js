const orderController = {};
const Form = require("../Models/Form");
const Order = require("../Models/Order");

orderController.createOrder = async (req, res, next) => {
  try {
    const userId = req.userId; // From
    const toUserId = req.params.id; // To
    const shipperId = req.params.id;
    const itemId = await Form.findById(itemId).populate("Item");
    let { status, deliveryMethod, images } = req.body;

    let order = await Order({
      from: userId,
      to: toUserId,
      shipperId: shipperId,
      itemId: itemId,
      status,
      deliveryMethod,
      images,
    });
    res.status(200).json({
      success: true,
      data: order,
      message: "Order create Scuccess",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

//Get all order with pagination
orderController.getAllOrders = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const totalOrders = await Order.count({ ...filter, isDeleted: false });
    const totalPages = Math.ceil(totalOrders / limit);
    const offset = limit * (page - 1);
    const orders = await Order.find(filter)
      .find(filter)
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: { orders, totalPages },
      message: "Gell all order success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = orderController;
