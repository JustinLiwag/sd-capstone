const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../joiSchemas');
const AppError = require('../utilities/AppError');
const asyncCatcher = require('../utilities/asyncCatcher');

const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

const validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

// Create Review Endpoint
router.post(
	'/',
	validateReview,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findById(id);
		const review = new Review(req.body.review);
		restaurant.reviews.push(review);
		await review.save();
		await restaurant.save();
		req.flash('success', 'Review was successfully created!');
		res.redirect(`/restaurants/${id}`);
	})
);

// Delete Review Endpoint
router.delete(
	'/:reviewId',
	asyncCatcher(async (req, res) => {
		const { id, reviewId } = req.params;
		await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
		await Review.findByIdAndDelete(reviewId);
		req.flash('success', 'Review was successfully deleted!');
		res.redirect(`/restaurants/${id}`);
	})
);

module.exports = router;
