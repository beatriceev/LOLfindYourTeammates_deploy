import { Router } from 'express';
import AccountRouter from './account.js';

const router = Router();
router.use('/', AccountRouter);

export default router;