import { Router } from 'express';

const router = Router();
import { showMessage } from '../controllers/auth';

router.get('/home', showMessage);

export default router;
