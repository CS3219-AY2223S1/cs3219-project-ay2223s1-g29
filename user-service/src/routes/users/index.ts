import { Request, Response, Router } from 'express';
import UserService from '../../services/userService';
import wrap from 'express-async-handler';
import router from '..';
import verifyToken from '../../middlewares/auth';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.post(
    '/register',
    wrap(async (req: Request, res: Response) => {
      const { username, password } = req.body;
      const newUser = await UserService.register(username, password);
      res.json(newUser).status(200);
    }),
  );

  route.post(
    '/login',
    wrap(async (req: Request, res: Response) => {
      const { username, password } = req.body;
      const user = await UserService.login(username, password);
      res.json(user).status(200);
    }),
  );

  route.patch(
    '/:userId',
    wrap(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const updatedUserFields = req.body;
      const updatedUser = await UserService.updateUser(userId, updatedUserFields);
      res.json(updatedUser).status(200);
    }),
  );

  route.delete(
    '/',
    verifyToken,
    wrap(async (req: Request, res: Response) => {
      const { username } = req.params;
      console.log(req.params);
      const deletedUser = await UserService.deleteUser(username);
      res.json(deletedUser).status(200);
    }),
  );
};
