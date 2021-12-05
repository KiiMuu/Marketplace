import { Router } from 'express';

const router = Router();

import { createConnectAccount } from '../controllers/stripe';
import { requireSignIn } from '../middleware';

router.post(
	'/stripe/createConnectAccount',
	requireSignIn,
	createConnectAccount
);

export default router;
