const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const { restaurantSchema, reviewSchema } = require('./joiSchemas');
const AppError = require('./utilities/AppError');
const asyncCatcher = require('./utilities/asyncCatcher');

const Restaurant = require('./models/restaurant');
const Review = require('./models/review');

// Database Config
mongoose.connect('mongodb://localhost:27017/restaurantCapstone', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

// Set EJS View Engine, EJS mate, and Path Fix
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));

// Add Public Folder and fix our path
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));

// Parse Body Data
app.use(express.urlencoded({ extended: true }));

// Method Override for Forms
app.use(methodOverride('_method'));

// ------ Middleware -------

const validateRestaurant = (req, res, next) => {
	const { error } = restaurantSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

const validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

// ------- Routes -------

app.get('/', (req, res) => {
	res.render('home');
});

// Restaurant Index Page
app.get(
	'/restaurants',
	asyncCatcher(async (req, res) => {
		const restaurants = await Restaurant.find({});
		res.render('restaurants/index', { restaurants });
	})
);

// Render New Restaurant Page
app.get('/restaurants/new', (req, res) => {
	res.render('restaurants/new');
});

// Create New Restaurant Endpoint
app.post(
	'/restaurants',
	validateRestaurant,
	asyncCatcher(async (req, res) => {
		const restaurant = new Restaurant(req.body.restaurant);
		await restaurant.save();
		res.redirect(`/restaurants/${restaurant.id}`);
	})
);

// Show Individual Restaurant Details
app.get(
	'/restaurants/:id',
	asyncCatcher(async (req, res, next) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findById(id).populate('reviews');
		if (!restaurant) {
			throw new AppError('Product not found!', 404);
		}
		res.render('restaurants/show', { restaurant });
	})
);

// Render Edit Restaurant Page
app.get(
	'/restaurants/:id/edit',
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findById(id);
		res.render('restaurants/edit', { restaurant });
	})
);

// Update Restaurant Endpoint
app.put(
	'/restaurants/:id',
	validateRestaurant,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findByIdAndUpdate(id, {
			...req.body.restaurant,
		});
		res.redirect(`/restaurants/${restaurant.id}`);
	})
);

// Delete Restaurant Endpoint
app.delete(
	'/restaurants/:id/delete',
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		await Restaurant.findByIdAndDelete(id);
		res.redirect('/restaurants');
	})
);

// ------- Review Routes -------

// Create Review Endpoint
app.post(
	'/restaurants/:id/reviews',
	validateReview,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const restaurant = await Restaurant.findById(id);
		const review = new Review(req.body.review);
		restaurant.reviews.push(review);
		await review.save();
		await restaurant.save();
		res.redirect(`/restaurants/${id}`);
	})
);

// Delete Review Endpoint
app.delete(
	'/restaurants/:id/reviews/:reviewId',
	asyncCatcher(async (req, res) => {
		const { id, reviewId } = req.params;
		await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
		await Review.findByIdAndDelete(reviewId);
		res.redirect(`/restaurants/${id}`);
	})
);

// ------- 404 -------

app.all('*', (req, res, next) => {
	next(new AppError('Page Not Found'), 404);
});

// ------- ERROR MIDDLEWARE -------
app.use((err, req, res, next) => {
	const { status = 500 } = err;
	const { message = 'I am in danger' } = err;
	res.status(status).render('error', { err });
});

// ------- APP Listener -------

app.listen(3000, () => {
	console.log('Running on port 3000');
});
