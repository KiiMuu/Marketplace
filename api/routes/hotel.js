import { Router } from 'express';
import formidable from 'formidable';

const router = Router();

import { createHotel, getHotels } from '../controllers/hotel';
import { requireSignIn } from '../middleware';

router.post('/hotel/create', requireSignIn, createHotel);
router.get('/hotel/all', getHotels);

export default router;
