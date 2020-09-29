const Category = require('../models/category');

exports.getAllCategory = (req, res) => {
	Category.find({}, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Unable to find categories',
			});
		}
		return res.status(200).json({
			category: result,
		});
	});
};

exports.addCategory = (req, res) => {
	let newCategory = new Category(req.body);
	newCategory.save((error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'unable to add category',
			});
		}
		return res.status(200).json({
			message: 'Category added Successfully',
			category: result,
		});
	});
};

exports.getCateogryById = (req, res, next, id) => {
	Category.findById(id).exec((error, result) => {
		if (error || !result) {
			return res.status(400).json({
				error: 'Error in finding the Category',
			});
		}
		req.category = result;
		next();
	});
};

exports.getCategory = (req, res) => {
	return res.status(200).json({
		category: req.category,
	});
};

exports.updateCategory = (req, res) => {
	Category.findAndUpdate(
		{ _id: req.category._id },
		{ $set: req.body },
		(error, result) => {
			if (error) {
				return res.status(400).json({
					error: 'Error in updating the category',
				});
			}
			return res.status(200).json({
				message: 'Category updated succesfully',
			});
		},
	);
};

exports.deleteCategory = (req, res) => {
	Category.deleteOne({ _id: req.category._id }, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in deleting category',
			});
		}
		return res.status(200).json({
			message: 'Category deleted successfully',
		});
	});
};
