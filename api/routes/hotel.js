import { Router } from 'express';
import formidable from 'formidable';

const router = Router();

import {
	createHotel,
	getHotels,
	getHotelImage,
	getSellerHotels,
	deleteHotel,
	getHotelById,
	updateHotel,
	getUserHotelBookings,
	isAlreadyBooked,
} from '../controllers/hotel';
import { hotelOwner, requireSignIn } from '../middleware';

router.post('/hotel/create', requireSignIn, createHotel);
router.get('/hotel/all', getHotels);
router.get('/hotel/:hotelId/image', getHotelImage);
router.get('/hotel/seller-hotels', requireSignIn, getSellerHotels);
router.delete('/hotel/:hotelId/delete', requireSignIn, hotelOwner, deleteHotel);
router.get('/hotel/:hotelId', getHotelById);
router.put('/hotel/:hotelId/update', requireSignIn, hotelOwner, updateHotel);
router.get('/hotel/user/bookings', requireSignIn, getUserHotelBookings);
router.get('/hotel/isAlreadyBooked/:hotelId', requireSignIn, isAlreadyBooked);

export default router;
