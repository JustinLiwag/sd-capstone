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
	{
		name: 'Urth Caffe',
		location: 'Pasadena, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Lucky Boys',
		location: 'Pasadena, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Crust & Crumble',
		location: 'Glendora, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Stuff I Eat',
		location: 'Inglewood, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Pie Life',
		location: 'Pasadena, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'California Donuts',
		location: 'Los Angeles, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Triple Beam Pizza',
		location: 'Los Angeles, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Pizzanista',
		location: 'Los Angeles, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Big Als Pizzeria',
		location: 'Maywood, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Dough Girl',
		location: 'Sylmar, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Masala',
		location: 'Fort Wayne, Indiana',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Grassfed Grill',
		location: 'New York,New York',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: "Freddy's Stove",
		location: 'Los Angeles, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Whispering Bamboo',
		location: 'Pasadena, California',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
	{
		name: 'Mediterra Seafood',
		location: 'Honolulu,Hawaii',
		image: 'https://source.unsplash.com/collection/1343727/1600x900',
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
	},
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
