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
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Lucky Boys',
		location: 'Pasadena, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Crust & Crumble',
		location: 'Glendora, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Stuff I Eat',
		location: 'Inglewood, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Pie Life',
		location: 'Pasadena, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'California Donuts',
		location: 'Los Angeles, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Triple Beam Pizza',
		location: 'Los Angeles, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Pizzanista',
		location: 'Los Angeles, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Big Als Pizzeria',
		location: 'Maywood, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Dough Girl',
		location: 'Sylmar, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Masala',
		location: 'Fort Wayne, Indiana',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Grassfed Grill',
		location: 'New York,New York',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: "Freddy's Stove",
		location: 'Los Angeles, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Whispering Bamboo',
		location: 'Pasadena, California',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
	},
	{
		name: 'Mediterra Seafood',
		location: 'Honolulu,Hawaii',
		image: [
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
				filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
			},
			{
				url:
					'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
				filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
			},
		],
		description:
			'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque commodi harum unde nesciunt minima! Culpa velit omnis dolore vitae, in ut repellendus fuga cupiditate totam excepturi ullam ab saepe similique.',
		price: '$$',
		dateOpened: 2015,
		submittedBy: '6057d7a07a644b19ad1e0f6e',
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
