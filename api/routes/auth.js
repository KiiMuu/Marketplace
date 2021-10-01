import { Router } from 'express';

const router = Router();

import { registerUser, loginUser } from '../controllers/auth';

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

export default router;
