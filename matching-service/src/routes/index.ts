import {Router} from 'express';
import matching from './matching';

const router = Router();
matching(router);

export default router