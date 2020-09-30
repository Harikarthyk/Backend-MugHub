const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getCateogryById } = require('../controllers/category');
const {
	createProduct,
	getProductById,
	deleteProduct,
	getProduct,
	getAllProduct,
	getProductByCategoryId,
	photo,
} = require('../controllers/product');
const { getUserById } = require('../controllers/user');

//params to find user by user Id
router.param('userId', getUserById);

//params to find product by product Id
router.param('productId', getProductById);

//params to find category by cateogry Id
router.param('categoryId', getCateogryById);

//Post route to create product
router.post(
	'/create/product/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct,
);

//Delete route to delete product
router.delete(
	'/delete/product/:productId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteProduct,
);

//Get route for product by product Id
router.get('/product/:productId', getProduct);

//Get route for all products
router.get('/products/all', getAllProduct);

//Get route for all products by cateogry
router.get('/products/all/:categoryId', getProductByCategoryId);

//Get Product
router.get('/product/photo/:productId', photo);

module.exports = router;
