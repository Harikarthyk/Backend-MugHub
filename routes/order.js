const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {
	createOrder,
	getAllOrderByUser,
	getAllOrder,
} = require('../controllers/order');
const { getUserById } = require('../controllers/user');
const router = express.Router();

router.param('userId', getUserById);

router.post('/create/order/:userId', isSignedIn, isAuthenticated, createOrder);

router.get('/order/:userId', isSignedIn, isAuthenticated, getAllOrderByUser);

router.get(
	'/allOrders/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getAllOrder,
);

module.exports = router;
