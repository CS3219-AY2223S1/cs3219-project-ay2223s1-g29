import { logger } from '../loggers/logger';
import RoomRepo from '../repository/roomRepo';
import { Exception } from '../exceptions';
import axios from 'axios';
import config from '../config';

const getQuestion = async (difficulty:string) => {
  const res = await axios.get(config.questionsServiceUrl + `/${difficulty}`);
  return res.data.question;
};

const createMatch = async (userId1: string, userId2: string, difficulty: string) => {
  logger.info(`Matching ${userId1} and ${userId2} with difficulty ${difficulty}`);
  try {
    const newRoom = RoomRepo.createRoom({
      userId1,
      userId2,
      difficulty,
      question: await getQuestion(difficulty),
    });
    return newRoom;
  }
  catch (err) {
    throw new Exception(`Failed to create match between ${userId1} and ${userId2}`, 500);
  }
};


const CollabService = {
  createMatch,
};

export { CollabService as default };
