import {Router} from 'express';
import history from './history';

const router = Router();
history(router);

export default router