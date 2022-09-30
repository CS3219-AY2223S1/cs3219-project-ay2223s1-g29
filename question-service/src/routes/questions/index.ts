import { Request, Response, Router} from 'express';
import wrap from 'express-async-handler';

const route = Router();

const easy = ["Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. \n You may assume that each input would have exactly one solution, and you may not use the same element twice. \n You can return the answer in any order.",
"Given an integer x, return true if x is palindrome integer. \n An integer is a palindrome when it reads the same backward as forward."]

const medium = ["Given a string s, find the length of the longest substring without repeating characters.", 
"You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. \n Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. \n You may assume that you have an infinite number of each kind of coin."]

const hard = ["Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. \n You can insert a character, delete a character or replace a character",
"Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring."]

const questions = [easy, medium, hard];

export default(app: Router) => {
    app.use('/questions', route);

    // api for easy questions
    route.get(
        '/:difficulty',
        wrap(async (req:Request, res:Response) => {
            const {difficulty} = req.params;

            switch (difficulty) {
                case "easy":
                    res.json({"question": easy[Math.floor(Math.random()*easy.length)]}).status(200);       
                    break;
                case "medium":
                    res.json({"question": medium[Math.floor(Math.random()*medium.length)]}).status(200);
                    break;
                case "hard":
                    res.json({"question": hard[Math.floor(Math.random()*hard.length)]}).status(200);
                    break;
                default:
                    console.log("random question");
                    // TODO: pick a random question
                    res.json({"question": questions[Math.floor(Math.random()*questions.length)][Math.floor(Math.random()*hard.length)]}).status(200);
            }
        })
    )
};