import {Router} from 'express';
import questions from './questions';

const router = Router();
questions(router);

export default router