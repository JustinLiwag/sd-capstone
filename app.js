const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const AppError = require('./utilities/AppError');
const flash = require('connect-flash');
const session = require('express-session');

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');

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

// Express Session
const sessionConfig = {
	secret: 'drake',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));

// Connect Flash
app.use(flash());

// ------- Middleware -------
app.use((req, res, next) => {
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

// ------- Index Route -------

app.get('/', (req, res) => {
	res.render('home');
});

// ------- Restaurant Routes -------
app.use('/restaurants', restaurantRoutes);

// ------- Review Routes -------
app.use('/restaurants/:id/reviews', reviewRoutes);

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
