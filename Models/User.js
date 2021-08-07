const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["giver", "recipient", "shipper", "admin"],
    },
    address: { type: String, required: true },
    images: [{ imageUrl: { type: String } }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
