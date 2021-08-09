const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["giver", "recipient", "shipper", "admin"],
    },
    deliveryMethod: {
      type: String,
      required: true,
      enum: ["pickUp", "delivery", "needShipper"],
    },
    address: { type: String, required: true },
    images: [{ imageUrl: { type: String } }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
