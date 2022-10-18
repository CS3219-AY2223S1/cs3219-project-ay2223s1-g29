import { Router } from 'express';
import matches from './matches';

const router = Router();
matches(router);

export default router;
