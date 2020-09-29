const formidable = require('formidable');
const Product = require('../models/product');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req, res, next, id) => {
	Product.findById(id).exec((error, result) => {
		if (error || !result) {
			return res.status(400).json({ error: 'Unable to find the Id' });
		}

		req.product = result;
		next();
	});
};

exports.getProduct = (req, res) => {
	return res.status(200).json({
		product: req.product,
	});
};

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (error, fields, file) => {
		if (error) {
			return res.status(400).json({
				error: 'Problem with Photo',
			});
		}
		const {
			name,
			description,
			orginalPrice,
			sellingPrice,
			category,
			stock,
		} = fields;
		if (!name || !description || !sellingPrice || !category || !stock)
			return res.status(400).json({ error: 'Enter All Fields' });

		const product = new Product(fields);

		//Handle file :
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'File Size is to Big',
				});
			}
		}
		product.photo.data = fs.readFileSync(file.photo.path);
		product.photo.contentType = file.photo.type;
		product.user = req.profile._id;
		product.save((error, docs) => {
			if (error)
				return res.status(400).json({
					error: 'Unable to save the Product in the DB',
				});
			return res.status(200).json({
				message: 'Product Added Successfully',
				product: docs,
			});
		});
	});
};

exports.deleteProduct = (req, res) => {
	Product.findByIdAndDelete(req.product._id).exec((error, result) => {
		if (error)
			return res.status(400).json({
				error: 'Error in deleteing Product',
			});
		return res.status(200).json({
			message: 'Product Deleted Successfully',
		});
	});
};

exports.updateProdcut = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (error, fields, file) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in Photos',
			});
		}
		let product = req.product;
		product = _.extend(product, fields);
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'Photo size is Large choose less than 3mb',
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		//Save to DB
		product.save((error, docs) => {
			if (error)
				return res.status(400).json({
					error: 'Unable to save the Product in the DB',
				});
			return res.status(200).json({
				message: 'Product Updated Successfully',
			});
		});
	});
};

exports.getAllProduct = (req, res) => {
	Product.find({}, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Unable get products',
			});
		}
		return res.status(200).json({
			products: result,
		});
	});
};

exports.getProductByCategoryId = (req, res) => {
	Product.find({ category: req.category._id }, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Error in getting product',
			});
		}
		return res.status(200).json({
			products: result,
		});
	});
};

exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
};
