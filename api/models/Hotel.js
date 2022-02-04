import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const HotelSchema = new Schema(
	{
		title: {
			type: String,
			required: 'Title cannot be blank',
		},
		content: {
			type: String,
			required: 'Content cannot be blank',
			maxlength: 10000,
		},
		location: {
			type: String,
		},
		price: {
			type: Number,
			required: 'Price cannot be blank',
			trim: true,
		},
		createdBy: {
			type: ObjectId,
			ref: 'User',
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		from: {
			type: Date,
		},
		to: {
			type: Date,
		},
		bed: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

const Hotel = mongoose.model('Hotel', HotelSchema);

export default Hotel;
