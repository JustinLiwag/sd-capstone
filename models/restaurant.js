const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
	name: String,
	image: String,
	price: String,
	description: String,
	location: String,
	dateOpened: Number,
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
