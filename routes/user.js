const express = require('express');
const { isAuthenticated, isSignedIn } = require('../controllers/auth');
const {
	getUserById,
	getUser,
	updateUser,
	getUserOrder,
	pushOrderInPurchaseList,
} = require('../controllers/user');
const router = require('./auth');

const routes = express.Router();

//params on userId is found
router.param('userId', getUserById);

//Get Route for user details
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

//Put Route for updating the details
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

//Get Route for all Order details
router.get('/orders/user/:userId', isSignedIn, isAuthenticated, getUserOrder);

//Put Route for pushing product in order list
router.put('/orders/user/:userId', pushOrderInPurchaseList);

module.exports = routes;
