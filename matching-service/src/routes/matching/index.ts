import { Request, Response, Router} from 'express';
import wrap from 'express-async-handler';
import MatchingService from '../../services/matchingService';
import CollabService from '../../services/collabService';
import verifyToken from '../../middlewares/auth'
import matchingService from '../../services/matchingService';

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
                    res.json({'status': 'matching user'}).status(200);
                } else {
                    console.log("queue is not empty, there is a match");
                    if (MatchingService.peekQueue(difficulty)==userid) {
                        // edge case when the same user that is queuing request to match again 
                        res.json({'status': 'user is already in the queue'}).status(200);
                    } else {
                        const userId2:string = MatchingService.popQueue(difficulty);
                        // send the user and the matched user to collab service
                        const data = (await CollabService.createMatch(userid, userId2, difficulty)).data;
                        res.json({'status': 'user matched successfully'}).status(200);
                    }
                }
            } else {
                res.status(200).send({'error': 'bad request: missing parameters'});
            }
        }),
    );

    // cancel matching
    route.delete(
        '/',
        verifyToken,
        wrap(async (req:Request, res:Response) => {
            const {difficulty} = req.body;
            const userid = req.params.username

            if (MatchingService.peekQueue(difficulty)==userid) {
                matchingService.popQueue(difficulty);
                res.json({'status': 'removed user from queue'}).status(200);
            } else {
                res.json({'status': 'user does not exist in the queue'}).status(200);
            }
        })
    )
};