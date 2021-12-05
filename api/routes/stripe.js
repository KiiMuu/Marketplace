import { Router } from 'express';

const router = Router();

import { createConnectAccount, getAccountStatus } from '../controllers/stripe';
import { requireSignIn } from '../middleware';

router.post(
	'/stripe/createConnectAccount',
	requireSignIn,
	createConnectAccount
);
router.post(
	'/stripe/getAccountStatus',
	requireSignIn,
	getAccountStatus
);

export default router;
