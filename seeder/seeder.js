const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');

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

const sampleRestaurants = [
	{ name: 'Urth Caffe', location: 'Pasadena, California' },
	{ name: 'Lucky Boys', location: 'Pasadena, California' },
	{ name: 'Crust & Crumble', location: 'Glendora, California' },
	{ name: 'Stuff I Eat', location: 'Inglewood, California' },
	{ name: 'Pie Life', location: 'Pasadena, California' },
	{ name: 'California Donuts', location: 'Los Angeles, California' },
	{ name: 'Triple Beam Pizza', location: 'Los Angeles, California' },
	{ name: 'Pizzanista', location: 'Los Angeles, California' },
	{ name: 'Big Als Pizzeria', location: 'Maywood, California' },
	{ name: 'Dough Girl', location: 'Sylmar, California' },
	{ name: 'Masala', location: 'Fort Wayne, Indiana' },
	{ name: 'Grassfed Grill', location: 'New York,New York' },
	{ name: "Freddy's Stove", location: 'Los Angeles, California' },
	{ name: 'Whispering Bamboo', location: 'Pasadena, California' },
	{ name: 'Mediterra Seafood', location: 'Honolulu,Hawaii' },
];

const seedDB = async () => {
	await Restaurant.deleteMany({});
	const res = await Restaurant.insertMany(sampleRestaurants)
		.then((data) => console.log('Data inserted'))
		.catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
	mongoose.connection.close();
});
