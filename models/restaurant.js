const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
	name: String,
	image: [
		{
			url: String,
			filename: String,
		},
	],
	price: String,
	description: String,
	location: String,
	dateOpened: Number,
	submittedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
});

RestaurantSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Review.deleteMany({
			_id: {
				$in: data.reviews,
			},
		});
	}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
