import { Request, Response, Router } from 'express';
import CollabService from '../../services/collabService';
import wrap from 'express-async-handler';
import { verify } from 'crypto';
import verifyToken from '../../middlewares/auth';

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

  route.get(
    '/status/',
    verifyToken,
    wrap(async (req: Request, res: Response) => {
      const room = await CollabService.getRoomByUserId(req.params.username);
      res.json({ room }).status(200);
    }
  ));

  route.delete(
    '/',
    verifyToken,
    wrap(async (req: Request, res: Response) => {
      const updatedRoom = await CollabService.updateRoomEndTime(req.params.username);
      setTimeout(() => {
	res.json({ updatedRoom }).status(200);
    }, 1000);
    })
  );
};
