const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {
	createOrder,
	getAllOrderByUser,
	getAllOrder,
	updateStatusForUser,
	getOrdeById,
} = require('../controllers/order');
const { getUserById } = require('../controllers/user');
const router = express.Router();

router.param('userId', getUserById);

router.param('orderId', getOrdeById);

router.post('/create/order/:userId', isSignedIn, isAuthenticated, createOrder);

router.get('/order/:userId', isSignedIn, isAuthenticated, getAllOrderByUser);

router.get(
	'/allOrders/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getAllOrder,
);

router.put(
	'/update/orders/:orderId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateStatusForUser,
);

module.exports = router;
