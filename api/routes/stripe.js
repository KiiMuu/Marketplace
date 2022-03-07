import { Router } from 'express';

const router = Router();

import {
	createConnectAccount,
	getAccountStatus,
	getAccountBalance,
	payoutSetting,
	getSessionId,
	stripeSuccess,
} from '../controllers/stripe';
import { requireSignIn } from '../middleware';

router.post(
	'/stripe/createConnectAccount',
	requireSignIn,
	createConnectAccount
);
router.post('/stripe/getAccountStatus', requireSignIn, getAccountStatus);
router.post('/stripe/getAccountBalance', requireSignIn, getAccountBalance);
router.post('/stripe/payoutSetting', requireSignIn, payoutSetting);
router.post('/stripe/getSessionId', requireSignIn, getSessionId);
router.post('/stripe/stripeSuccess', requireSignIn, stripeSuccess);

export default router;
