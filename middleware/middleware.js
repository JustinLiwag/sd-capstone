const AppError = require('../utilities/AppError');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const { restaurantSchema, reviewSchema } = require('../joiSchemas');

module.exports.isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be signed in to do that');
		return res.redirect('/login');
	}
	next();
};

module.exports.validateRestaurant = (req, res, next) => {
	const { error } = restaurantSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.isCreator = async (req, res, next) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findById(id);
	if (!restaurant.submittedBy.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/restaurants/${id}`);
	}
	next();
};

module.exports.isReviewCreator = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/restaurants/${id}`);
	}
	next();
};

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};
