const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Restaurant = require('./models/restaurant');

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

// Set EJS View Engine and Path Fix
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse Body Data
app.use(express.urlencoded({ extended: true }));

// Method Override for Forms
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.render('home');
});

// Restaurant Index Page
app.get('/restaurants', async (req, res) => {
	const restaurants = await Restaurant.find({});
	res.render('index', { restaurants });
});

// Render New Restaurant Page
app.get('/restaurants/new', (req, res) => {
	res.render('new');
});

// Create New Restaurant Endpoint
app.post('/restaurants', async (req, res) => {
	const restaurant = new Restaurant(req.body.restaurant);
	await restaurant.save();
	res.redirect(`/restaurants/${restaurant.id}`);
});

// Show Individual Restaurant Details
app.get('/restaurants/:id', async (req, res) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findById(id);
	res.render('show', { restaurant });
});

// Render Edit Restaurant Page
app.get('/restaurants/:id/edit', async (req, res) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findById(id);
	res.render('edit', { restaurant });
});

// Update Restaurant Endpoint
app.put('/restaurants/:id', async (req, res) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findByIdAndUpdate(id, {
		...req.body.restaurant,
	});
	res.redirect(`/restaurants/${restaurant.id}`);
});

// Delete Restaurant Endpoint
app.delete('/restaurants/:id/delete', async (req, res) => {
	const { id } = req.params;
	await Restaurant.findByIdAndDelete(id);
	res.redirect('/restaurants');
});

app.listen(3000, () => {
	console.log('Running on port 3000');
});
