import { Request, Response, Router} from 'express';
import wrap from 'express-async-handler';
import MatchingService from '../../services/matchingService';
import CollabService from '../../services/collabService';
import verifyToken from '../../middlewares/auth'

const route = Router();

export default(app: Router) => {
    app.use('/matching', route);

    // create
    route.post(
        '/',
        verifyToken,
        wrap(async (req:Request, res:Response) => {
            const {difficulty} = req.body;
            const userid = req.params.username
            console.log(userid, difficulty);
            if (userid && difficulty) {
                // check if queue is empty
                if (MatchingService.isEmpty(difficulty)) {
                    // if it is empty, add to queue
                    console.log("queue is empty, adding to queue");
                    MatchingService.addQueue(userid, difficulty);
                } else {
                    console.log("queue is not empty, there is a match");
                    // TODO: notify collab service that there is a match by calling collab service api
                    const userId2:string = MatchingService.popQueue(difficulty);
                    const data = (await CollabService.createMatch(userid, userId2, difficulty)).data;
                    console.log(data);
                }
                res.json({'status': 'matching user'}).status(200);
            } else {
                res.status(400).send({'error': 'bad request: missing parameters'});
            }
        }),
    );
};