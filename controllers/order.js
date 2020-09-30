const { Order } = require('../models/order');
exports.createOrder = (req, res) => {
	const newOrder = new Order(req.body);
	newOrder.save((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'unable to purchase Cart Try Again Later',
			});
		}
		return res.status(200).json({
			message: 'Your Products are Booked',
		});
	});
};

exports.getAllOrderByUser = (req, res) => {
	Order.find({ user: req.profile._id })
		.populate('purchases.product', '_id name sellingPrice')
		.populate('user', '_id name')
		.then((result) => {
			return res.status(200).json({
				orders: result,
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error: 'Error in Tracking Orders',
			});
		});
};

exports.getAllOrder = (req, res) => {
	Order.find({})
		.populate('purchases.product', '_id name sellingPrice')
		.populate('user', '_id name')
		.exec((error, result) => {
			if (error) {
				return res.status(400).json({ error: error });
			}
			return res.status(200).json({ order: result });
		});
};
