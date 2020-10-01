const { Order } = require('../models/order');
const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in finding the user',
			});
		}
		result.password = undefined;
		req.profile = result;
		next();
	});
};

exports.getUser = (req, res) => {
	return res.status(200).json({
		user: req.profile,
	});
};

exports.updateUser = (req, res) => {
	User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }).exec(
		(error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Error in updating the user',
				});
			}
			return res.status(200).json({
				message: 'Update Successfull',
			});
		},
	);
};

exports.getUserOrder = (req, res) => {
	Order.find({ user: req.profile._id })
		.populate('user', '_id name')
		.exec((error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Error in getting Orders',
				});
			}
			return res.status(200).json({
				orders: result,
			});
		});
};
