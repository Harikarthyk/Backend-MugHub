const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PurchaseItem = new mongoose.Schema({
	product: { type: ObjectId, ref: 'Product' },
	count: {
		type: Number,
	},
});

const PurchaseCartItem = mongoose.model('PurchaseCartItem', PurchaseItem);

const orderSchema = new mongoose.Schema({
	purchases: [PurchaseItem],
	amount: {
		type: Number,
		default: 0,
	},
	user: {
		type: ObjectId,
		ref: 'User',
	},
	status: {
		type: String,
		default: 'Pending',
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, PurchaseCartItem };
