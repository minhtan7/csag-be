const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
			enum: ['giver', 'recipient', 'shipper', 'admin'],
		},
		address: { type: String, required: true },
		geocode: { lat: { type: Number }, lng: { type: Number } },
		city: { type: String, required: true },
		images: [{ imageUrl: { type: String } }],
	},
	{ timestamps: true }
);

userSchema.methods.toJSON = function () {
	const obj = this._doc;
	delete obj.password;
	delete obj.isDeleted;
	return obj;
};

userSchema.methods.generateToken = async function () {
	const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
		expiresIn: '3d',
	});
	return accessToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
