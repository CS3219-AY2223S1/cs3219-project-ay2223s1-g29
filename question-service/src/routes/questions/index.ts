import { Request, Response, Router} from 'express';
import wrap from 'express-async-handler';
import QuestionRepo from '../../repository/questionRepo';

const route = Router();

export default(app: Router) => {
    app.use('/questions', route);

    // api for easy questions
    route.get(
        '/:difficulty',
        wrap(async (req:Request, res:Response) => {
            const {difficulty} = req.params;

            switch (difficulty) {
                case "easy":
                    const easyQuestion = await QuestionRepo.getEasyQuestion();
                    res.json(easyQuestion).status(200);       
                    break;
                case "medium":
                    const mediumQuestion = await QuestionRepo.getMediumQuestion();
                    res.json(mediumQuestion).status(200);
                    break;
                case "hard":
                    const hardQuestion = await QuestionRepo.getHardQuestion();
                    res.json(hardQuestion).status(200);
                    break;
                default:
                    const randQuestion = await QuestionRepo.getRandomQuestion();
                    res.json(randQuestion).status(200);
            }
        })
    )
};