const orderController = {};
const Form = require("../Models/Form");
const Order = require("../Models/Order");
const User = require("../Models/User");

orderController.createOrder = async (req, res, next) => {
  try {
    const userId = req.userId; // From
    let { deliveryMethod, images, items, toUserId } = req.body;

    let order = await Order.create({
      from: userId,
      to: toUserId,
      items,
      deliveryMethod,
      images,
    });
    order = await order.populate("from").populate("to").execPopulate();
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
      .limit(limit)
      .populate("from")
      .populate("to");

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

///getsingleOrder
orderController.getSingleOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      throw new Error("order not found", "Get Single order Error");
    }

    order = order.toJSON();
    console.log("ordersigle", order);
    res.status(200).json({
      success: true,
      data: order,
      message: "Gell single order success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
///Updateorder.
orderController.updateOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        status,
      },

      { new: true }
    );
    if (!order) {
      throw new Error(
        "order not found or User not authorized",
        "Updated order Error"
      );
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "order updated success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
///Detelete order

orderController.deleteOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(
      orderId,

      { isDeleted: true }
    );
    if (!order) {
      throw new Error(
        "order not found or User not authorized",
        "Delete order Error"
      );
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "order delete success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = orderController;
