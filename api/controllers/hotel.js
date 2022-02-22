import fs from 'fs';
import formidable from 'formidable';
import Hotel from '../models/Hotel';

const createHotel = async (req, res, next) => {
	const form = formidable({});

	try {
		form.parse(req, (err, fields, files) => {
			if (err) {
				next(err);
				return;
			}

			let hotel = new Hotel(fields);
			hotel.createdBy = req.user.id;

			if (files.image) {
				hotel.image.data = fs.readFileSync(files.image.filepath);
				hotel.image.contentType = files.image.mimetype;
			}

			let errors = [];
			if (!fields.title)
				errors.push({
					param: 'title',
					msg: 'Title cannot be blank.',
				});
			if (!fields.content) {
				errors.push({
					param: 'content',
					msg: 'Content cannot be blank.',
				});
			}
			if (!fields.price) {
				errors.push({
					param: 'price',
					msg: 'Price cannot be blank.',
				});
			}

			if (errors.length) return res.status(400).json(errors);

			hotel.save((err, hotel) => {
				if (err) {
					return res.status(400).json({
						msg: err.message,
					});
				}

				res.status(200).json(hotel);
			});
		});
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const getHotels = async (req, res) => {
	try {
		let hotels = await Hotel.find({})
			.limit(24)
			.select('-image.data')
			.populate('createdBy', '_id name')
			.sort({ createdAt: -1 })
			.exec();

		return res.json(hotels);
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const getHotelImage = async (req, res) => {
	try {
		let hotel = await Hotel.findById(req.params.hotelId).exec();

		if (hotel && hotel.image && hotel.image.data !== null) {
			res.set('Content-Type', hotel.image.contentType);

			return res.send(hotel.image.data);
		}
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const getSellerHotels = async (req, res) => {
	try {
		let sellerHotels = await Hotel.find({ createdBy: req.user.id })
			.select('-image.data')
			.populate('createdBy', '_id name email')
			.sort({ createdAt: -1 })
			.exec();

		return res.json(sellerHotels);
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const deleteHotel = async (req, res) => {
	try {
		let removedHotel = await Hotel.findByIdAndDelete(req.params.hotelId)
			.select('-image.data')
			.exec();

		return res.json(removedHotel);
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const getHotelById = async (req, res) => {
	try {
		let singleHotel = await Hotel.findById(req.params.hotelId)
			.select('-image.data')
			.populate('createdBy', 'name email')
			.exec();

		return res.json(singleHotel);
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

const updateHotel = async (req, res) => {
	const form = formidable({});

	try {
		form.parse(req, async (err, fields, files) => {
			if (err) {
				next(err);
				return;
			}

			let data = { ...fields };

			if (files.image) {
				let image = {};
				image.data = fs.readFileSync(files.image.filepath);
				image.contentType = files.image.mimetype;

				data.image = image;
			}

			let errors = [];
			if (!fields.title)
				errors.push({
					param: 'title',
					msg: 'Title cannot be blank.',
				});
			if (!fields.content) {
				errors.push({
					param: 'content',
					msg: 'Content cannot be blank.',
				});
			}
			if (!fields.price) {
				errors.push({
					param: 'price',
					msg: 'Price cannot be blank.',
				});
			}

			if (errors.length) return res.status(400).json(errors);

			let updatedHotel = await Hotel.findByIdAndUpdate(
				req.params.hotelId,
				data,
				{ new: true }
			).select('-image.data');

			return res.json(updatedHotel);
		});
	} catch (error) {
		return res.status(400).json({
			msg: error.message,
		});
	}
};

export {
	createHotel,
	getHotels,
	getHotelImage,
	getSellerHotels,
	deleteHotel,
	getHotelById,
	updateHotel,
};
