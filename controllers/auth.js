//Import dependencies
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const { validationResult } = require('express-validator');

exports.register = (req, res) => {
	let { errors } = validationResult(req);
	if (errors.length >= 1) {
		return res.status(400).json({
			error: errors[0].msg,
		});
	}
	User.find({ email: req.body.email }, (error, result) => {
		if (error) {
			return res.status(400).json({
				error: 'Un excpeted error',
			});
		}

		if (result.length >= 1) {
			return res.status(200).json({
				error: 'email already registerd',
			});
		}
		bcrypt.hash(req.body.password, 10, function (err, hash) {
			req.body.password = hash;
			let newUser = new User(req.body);
			newUser.save((error, result) => {
				if (error) {
					return res.status(400).json({
						error: 'Unable to register User',
					});
				}
				result.password = undefined;
				return res.status(200).json({
					user: result,
				});
			});
		});
	});
};

exports.login = (req, res) => {
			User.findOne({ email: req.body.email }, (error, result) => {
		if (error || !result) {
			return res.status(400).json({ error: 'Missmatch password and email' });
		}
		bcrypt.compare(req.body.password, result.password, function (err, check) {
			if (!check) {
				return res.status(400).json({ error: 'Missmatch password and email' });
			}
			let token = jwt.sign({ _id: result._id }, process.env.SECRET_CODE);
			res.cookie('token', token, {
				expires: new Date(Date.now() + 9999),
			});
			result.password = undefined;
			return res.status(200).json({
				token: token,
				user: result,
			});
		});
	});
};
exports.logout = (req, res) => {
	res.clearCookie('token');
	res.status(200).json({
		message: 'Sign Out Successfully',
	});
};

exports.isSignedIn = expressJWT({
	secret: process.env.SECRET_CODE,
	algorithms: ['HS256'],
	userProperty: 'auth',
});

exports.isAuthenticated = (req, res, next) => {
	let check = req.auth && req.profile && req.auth._id == req.profile._id;
	if (!check) {
		return res.status(400).json({
			error: 'Unauthorized Access',
		});
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile._id === 0) {
		res.status(400).json({
			error: 'Unauthorized Access',
		});
	}
	next();
};
