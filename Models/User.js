const mongoose = require('mongoose');

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
		deliveryMethod: {
			type: String,
			// required: true,
			enum: ['pickUp', 'delivery', 'needShipper'],
		},
		address: { type: String, required: true },
		geocode: { lat: { type: Number }, lng: { type: Number } },
		city: { type: String, required: true },
		images: [{ imageUrl: { type: String } }],
	},
	{ timestamps: true }
);
const User = mongoose.model('User', userSchema);

module.exports = User;
