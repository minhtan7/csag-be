<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
>>>>>>> ffc617d4f19cdb2c9fa86232812ea3ab638f87e4

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: {
      type: String,
      // required: true,
      enum: ["giver", "recipient", "shipper", "admin"],
    },
    deliveryMethod: {
      type: String,
      // required: true,
      enum: ["pickUp", "delivery", "needShipper"],
    },
    address: { type: String, required: true },
    geocode: { lat: { type: Number }, lng: { type: Number } },
    city: { type: String, required: true },
    images: [{ imageUrl: { type: String } }],
  },
  { timestamps: true }
);
<<<<<<< HEAD
const User = mongoose.model("User", userSchema);
=======
userSchema.methods.generateToken = async function () {
	const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
		expiresIn: '1d',
	});
	return accessToken;
};
const User = mongoose.model('User', userSchema);
>>>>>>> ffc617d4f19cdb2c9fa86232812ea3ab638f87e4

module.exports = User;
