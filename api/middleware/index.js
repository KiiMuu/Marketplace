import expressJWT from 'express-jwt';
import Hotel from '../models/Hotel';

export const requireSignIn = expressJWT({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
});

export const hotelOwner = async (req, res, next) => {
	let hotel = await Hotel.findById(req.params.hotelId).exec();

	let owner = hotel.createdBy._id.toString() === req.user.id.toString();

	if (!owner) return res.status(403).json({ msg: 'Unauthorized!' });

	next();
};
