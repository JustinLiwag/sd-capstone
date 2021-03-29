const Restaurant = require('../models/restaurant');
const { cloudinary } = require('../cloudinary/index');

module.exports.renderIndex = async (req, res) => {
	const restaurants = await Restaurant.find({});
	res.render('restaurants/index', { restaurants });
};

module.exports.renderNew = (req, res) => {
	res.render('restaurants/new');
};

module.exports.postNewRestaurant = async (req, res) => {
	const restaurant = new Restaurant(req.body.restaurant);
	restaurant.image = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	restaurant.submittedBy = req.user._id;
	await restaurant.save();
	req.flash('success', 'New restaurant was successfully added!');
	res.redirect(`/restaurants/${restaurant.id}`);
};

module.exports.renderShow = async (req, res, next) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findById(id)
		.populate({
			path: 'reviews',
			populate: {
				path: 'author',
			},
		})
		.populate('submittedBy');
	if (!restaurant) {
		req.flash('error', 'Restaurant does not exist!');
		res.redirect('/restaurants');
	}
	res.render('restaurants/show', { restaurant });
};

module.exports.renderEdit = async (req, res) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findById(id);
	if (!restaurant) {
		req.flash('error', 'Restaurant does not exist!');
		res.redirect('/restaurants');
	}
	res.render('restaurants/edit', { restaurant });
};

module.exports.updateRestaurant = async (req, res) => {
	const { id } = req.params;
	const restaurant = await Restaurant.findByIdAndUpdate(id, {
		...req.body.restaurant,
	});
	const imgs = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	restaurant.image.push(...imgs);
	await restaurant.save();
	if (req.body.selectedImages) {
		for (let filename of req.body.selectedImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await restaurant.updateOne({
			$pull: { image: { filename: { $in: req.body.selectedImages } } },
		});
	}
	req.flash('success', 'Restaurant was successfully updated!');
	res.redirect(`/restaurants/${restaurant.id}`);
};

module.exports.deleteRestaurant = async (req, res) => {
	const { id } = req.params;
	await Restaurant.findByIdAndDelete(id);
	req.flash('success', 'Restaurant was successfully deleted!');
	res.redirect('/restaurants');
};
