const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const {
	updateCategory,
	getCateogryById,
	getAllCategory,
	addCategory,
	getCategory,
	deleteCategory,
} = require('../controllers/category');
const { getUserById } = require('../controllers/user');

//params to find user by user Id
router.param('userId', getUserById);

//params to find category by category Id
router.param('categoryId', getCateogryById);

//Get route for get category by Id
router.get('/category/:categoryId', getCategory);

//Get route for all category
router.get('/allCategory', getAllCategory);

//Put route for update category by category Id
router.put(
	'/updateCategory/:userId/:categoryId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateCategory,
);

//Delete route for delete category by category Id
router.delete(
	'/delete/category/:categoryId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	deleteCategory,
);

//Post route for create category
router.post(
	'/addCategory/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	addCategory,
);

module.exports = router;
