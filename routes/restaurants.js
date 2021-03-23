const express = require('express');
const router = express.Router();
const { restaurantSchema } = require('../joiSchemas');
const AppError = require('../utilities/AppError');
const asyncCatcher = require('../utilities/asyncCatcher');
const {
	isAuthenticated,
	validateRestaurant,
	isCreator,
} = require('../middleware/middleware');

const Restaurant = require('../models/restaurant');

// Restaurant Index Page
router.get(
	'/',
	asyncCatcher(async (req, res) => {
		const restaurants = await Restaurant.find({});
		res.render('restaurants/index', { restaurants });
	})
);

// Render New Restaurant Page
router.get('/new', isAuthenticated, (req, res) => {
	res.render('restaurants/new');
});

// Create New Restaurant Endpoint
router.post(
	'/',
	isAuthenticated,
	validateRestaurant,
	asyncCatcher(async (req, res) => {
		const restaurant = new Restaurant(req.body.restaurant);
		restaurant.submittedBy = req.user._id;
		await restaurant.save();
		req.flash('success', 'New restaurant was successfully added!');
		res.redirect(`/restaurants/${restaurant.id}`);
	})
);

// Show Individual Restaurant Details
router.get(
	'/:id',
	asyncCatcher(async (req, res, next) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findById(id)
			.populate({
				path: 'reviews',
				populate: {
					path: 'author',
				},
			})
			.populate('submittedBy');
		if (!restaurant) {
			req.flash('error', 'Restaurant does not exist!');
			res.redirect('/restaurants');
		}
		res.render('restaurants/show', { restaurant });
	})
);

// Render Edit Restaurant Page
router.get(
	'/:id/edit',
	isAuthenticated,
	isCreator,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findById(id);
		if (!restaurant) {
			req.flash('error', 'Restaurant does not exist!');
			res.redirect('/restaurants');
		}
		res.render('restaurants/edit', { restaurant });
	})
);

// Update Restaurant Endpoint
router.put(
	'/:id',
	isAuthenticated,
	isCreator,
	validateRestaurant,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findByIdAndUpdate(id, {
			...req.body.restaurant,
		});
		req.flash('success', 'Restaurant was successfully updated!');
		res.redirect(`/restaurants/${restaurant.id}`);
	})
);

// Delete Restaurant Endpoint
router.delete(
	'/:id/delete',
	isAuthenticated,
	isCreator,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		await Restaurant.findByIdAndDelete(id);
		req.flash('success', 'Restaurant was successfully deleted!');
		res.redirect('/restaurants');
	})
);

module.exports = router;
