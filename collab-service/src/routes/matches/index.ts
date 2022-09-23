import { Request, Response, Router } from 'express';
import CollabService from '../../services/collabService';
import wrap from 'express-async-handler';

const route = Router();

export default (app: Router) => {
  app.use('/matches', route);

  route.post(
    '/',
    wrap(async (req: Request, res: Response) => {
      const { userId1, userId2, difficulty } = req.body;
      const newMatch = await CollabService.createMatch(userId1, userId2, difficulty);
      res.json(newMatch).status(200);
    }),
  );
};
