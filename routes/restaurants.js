const express = require('express');
const router = express.Router();
const { restaurantSchema } = require('../joiSchemas');
const AppError = require('../utilities/AppError');
const asyncCatcher = require('../utilities/asyncCatcher');
const restaurant = require('../controllers/restaurants');
const {
	isAuthenticated,
	validateRestaurant,
	isCreator,
} = require('../middleware/middleware');

const Restaurant = require('../models/restaurant');

router
	.route('/')
	// Restaurant Index Page
	.get(asyncCatcher(restaurant.renderIndex))
	// Create New Restaurant Endpoint
	.post(
		isAuthenticated,
		validateRestaurant,
		asyncCatcher(restaurant.postNewRestaurant)
	);

// Render New Restaurant Page
router.get('/new', isAuthenticated, restaurant.renderNew);

router
	.route('/:id')
	// Show Individual Restaurant Details
	.get(asyncCatcher(restaurant.renderShow))
	// Update Restaurant Endpoint
	.put(
		isAuthenticated,
		isCreator,
		validateRestaurant,
		asyncCatcher(restaurant.updateRestaurant)
	);

// Render Edit Restaurant Page
router.get(
	'/:id/edit',
	isAuthenticated,
	isCreator,
	asyncCatcher(restaurant.renderEdit)
);

// Delete Restaurant Endpoint
router.delete(
	'/:id/delete',
	isAuthenticated,
	isCreator,
	asyncCatcher(restaurant.deleteRestaurant)
);

module.exports = router;
