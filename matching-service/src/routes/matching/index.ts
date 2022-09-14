import { Request, Response, Router} from 'express';
import wrap from 'express-async-handler';
import MatchingService from '../../services/matchingService';

const route = Router();

export default(app: Router) => {
    app.use('/matching', route);

    // create
    route.post(
        '/',
        wrap(async (req:Request, res:Response) => {
            const {name, difficulty} = req.body;
            console.log(name, difficulty);
            if (name && difficulty) {
                // check if queue is empty
                if (MatchingService.isEmpty(difficulty)) {
                    // if it is empty, add to queue
                    console.log("queue is empty, adding to queue");
                    MatchingService.addQueue(name, difficulty);
                } else {
                    console.log("queue is not empty, there is a match");
                    // TODO: notify collab service that there is a match
                    MatchingService.popQueue(difficulty);
                }
                res.json({'status': 'matching user'}).status(200);
            } else {
                res.status(400).send({'error': 'bad request: missing parameters'});
            }
        }),
    );

    // TODO: for collab service to keep polling to check if there is a match
    route.get(
        '/',
        wrap(async(req:Request, res:Response) => {
            res.json({'status': 'working'}).status(200);
        })
    )
};