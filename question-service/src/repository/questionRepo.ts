import { Question, QuestionModel } from "../models/questionModel";

const getEasyQuestion =async () => {
    const easy = await QuestionModel.find({difficulty:"easy"});
    const easyQuestion = easy[Math.floor(Math.random()*easy.length)];
    return easyQuestion;
}

const getMediumQuestion =async () => {
    const medium = await QuestionModel.find({difficulty:"medium"});
    const mediumQuestion = medium[Math.floor(Math.random()*medium.length)];
    return mediumQuestion;
}

const getHardQuestion =async () => {
    const hard = await QuestionModel.find({difficulty:"hard"});
    const hardQuestion = hard[Math.floor(Math.random()*hard.length)];
    return hardQuestion;
}

const getRandomQuestion =async () => {
    const questions = await QuestionModel.find();
    const randQuestion = questions[Math.floor(Math.random()*questions.length)];
    return randQuestion;
}

const QuestionRepo = {
    getEasyQuestion,
    getMediumQuestion,
    getHardQuestion,
    getRandomQuestion,
};

export { QuestionRepo as default };
