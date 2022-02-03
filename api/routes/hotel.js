import { Router } from 'express';

const router = Router();

import { createHotel } from '../controllers/auth';

router.post('/hotel/create', createHotel);

export default router;
