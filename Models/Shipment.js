const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shipmentSchema = new Schema(
  {
    content: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
module.exports = Shipment;
