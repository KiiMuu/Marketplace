import { Router } from 'express';
import formidable from 'formidable';

const router = Router();

import {
	createHotel,
	getHotels,
	getHotelImage,
	getSellerHotels,
} from '../controllers/hotel';
import { requireSignIn } from '../middleware';

router.post('/hotel/create', requireSignIn, createHotel);
router.get('/hotel/all', getHotels);
router.get('/hotel/:hotelId/image', getHotelImage);
router.get('/hotel/seller-hotels', requireSignIn, getSellerHotels);

export default router;
