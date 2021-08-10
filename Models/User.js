const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
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
    images: [{ type: String }],
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
