const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    to: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    shipperId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        category: {
          type: String,
          enum: ["food", "household", "medical"],
          required: true,
        },
      },
    ],

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "pickup", "delivering", "done"],
    },
    deliveryMethod: {
      type: String,
      required: true,
      enum: ["pickUp", "delivery", "needShipper"],
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
