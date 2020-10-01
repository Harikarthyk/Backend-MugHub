const { Order } = require('../models/order');

exports.getOrdeById = (req, res, next, id) => {
	Order.findById(id).exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in finding the Order',
			});
		}
		req.order = result;
		next();
	});
};

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
		.populate('user', '_id name email')
		.exec((error, result) => {
			if (error) {
				return res.status(400).json({ error: error });
			}
			return res.status(200).json({ order: result });
		});
};

exports.updateStatusForUser = (req, res) => {
	Order.findOneAndUpdate(
		{ _id: req.order._id },
		{ $set: req.body },
		(error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Unable Change the delivery status',
				});
			}
			return res.status(200).json({
				message: 'Successfully Delivered',
			});
		},
	);
};
