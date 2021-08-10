const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		from: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		to: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		shipperId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		form: { type: Schema.Types.ObjectId, required: true, ref: 'Form' },
		status: {
			type: String,
			default: 'pending',
			enum: ['pending', 'pickup', 'delivering', 'done'],
		},
		deliveryMethod: {
			type: String,
			required: true,
			enum: ['recipient', 'giver', 'shipper'],
		},
		images: [{ type: String }],
	},
	{ timestamps: true }
);
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
