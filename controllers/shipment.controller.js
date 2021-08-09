const shipmentController = {};

const Order = require("../Models/Order");
const Shipment = require("../Models/Shipment");

shipmentController.getShipment = async (req, res, next) => {
  try {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 1;
    const totalShipment = await Shipment.count({ ...filter, isDeleted: false });
    const totalPages = Math.ceil(totalShipment / limit);
    const offset = limit * (page - 1);
    let shipments = await Order.find({ deliveryMethod: "needShipper" })
      .populate("Order")
      .sort({ ...sortBy, createdAt: -1 })
      .skip(offset)
      .limit(limit);
    res.status(200).json({
      success: true,
      data: { shipments, totalPages },
      message: "Get all shipping docs success",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// shipmentController.createShipment = async (req, res, next) => {
//   try {
//     const userId = req.userId;
//     let shipment = await Order.find({ deliveryMethod: "needShipper" }).populate(
//       "Order"
//     );

//     res.status(200).json({
//       success: true,
//       data: shipment,
//       message: "create shipment success",
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };
module.exports = shipmentController;