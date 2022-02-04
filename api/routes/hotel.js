import { Router } from 'express';
import formidable from 'formidable';

const router = Router();

import { createHotel } from '../controllers/hotel';
import { requireSignIn } from '../middleware';

router.post('/hotel/create', requireSignIn, createHotel);

export default router;
