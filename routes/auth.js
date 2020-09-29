const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { register, login, logout } = require('../controllers/auth');

//Register Post Route
router.post(
	'/register',
	[
		check('password')
			.isLength({ min: 4 })
			.withMessage('password must minimum 4 Character '),
		check('email').isEmail().withMessage('enter the valid Email Id'),
	],
	register,
);

//Login Post Route
router.post(
	'/login',
	[
		check('password')
			.isLength({ min: 4 })
			.withMessage('password must minimum 4 Character '),
		check('email').isEmail().withMessage('enter the valid Email Id'),
	],
	login,
);

//Log out Get Route
router.get('/logout', logout);

module.exports = router;
