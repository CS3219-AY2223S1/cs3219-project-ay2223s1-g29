import { Request, Response, Router} from 'express';
import wrap from 'express-async-handler';
import HistoryService from '../../services/historyService';
import verifyToken from '../../middlewares/auth'
import { logger } from '../../loggers/logger';

const route = Router();

export default(app: Router) => {
    app.use('/history', route);

    // create
    route.get(
        '/',
        wrap(async (req:Request, res:Response) => {
            let userId1: string = "";
            let userId2: string = "";
            let difficulty: string = "";
            let questionId: string = "";
            if (req.query.userId1) {
                userId1 = req.query.userId1 as string;
            }
            if (req.query.userId2) {
                userId2 = req.query.userId2 as string;
            }
            if (req.query.difficulty) {
                difficulty = req.query.difficulty as string;
            }
            if (req.query.questionId) {
                questionId = req.query.questionId as string;
            }
            const stats = await HistoryService.getStats(userId1, userId2, difficulty, questionId);  
            res.json(stats).status(200);
        }),
    );
};