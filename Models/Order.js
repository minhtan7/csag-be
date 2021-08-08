const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const orderSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    to: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    shipperId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Item",
    },
    status: {
      type: String,
      enum: ["pending", "accept", "delivering", "receive", "done"],
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
