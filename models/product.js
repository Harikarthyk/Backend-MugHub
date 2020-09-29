const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
		},
		category: {
			type: ObjectId,
			ref: 'Category',
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		stock: {
			type: Number,
			required: true,
		},
		sold: {
			type: Number,
			default: 0,
		},
		user: {
			type: ObjectId,
			ref: 'User',
		},
		sellingPrice: {
			type: Number,
			default: 0,
		},
		orginalPrice: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
