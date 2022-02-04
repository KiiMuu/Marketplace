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

export { createHotel };
