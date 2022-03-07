import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema(
	{
		hotel: {
			type: ObjectId,
			ref: 'Hotel',
		},
		session: {},
		orderedBy: {
			type: ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
