import { logger } from '../loggers/logger';
import RoomRepo from '../repository/roomRepo';
import { Exception } from '../exceptions';


const createMatch = async (userId1: string, userId2: string, difficulty: string) => {
  logger.info(`Matching ${userId1} and ${userId2} with difficulty ${difficulty}`);
  try {
    const newRoom = RoomRepo.createRoom({
      userId1,
      userId2,
      difficulty,
      question: 'test question',
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
