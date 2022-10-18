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
  const TIME_OUT_IN_MS = 1000 * 60 * 60 * 6; // 6 hours
  const isRoomExist = await RoomRepo.getRoomByUserId(userId1) || await RoomRepo.getRoomByUserId(userId2);
  if (isRoomExist) {
    logger.warn(`Room already exists for user ${userId1} or ${userId2}`);
    throw new Exception(`Room already exists for user ${userId1} or ${userId2}`, 409);
  }
  try {
    const newRoom = RoomRepo.createRoom({
      userId1,
      userId2,
      difficulty,
      question: await getQuestion(difficulty),
      endTime: new Date(Date.now() + TIME_OUT_IN_MS),
    });
    return newRoom;
  }
  catch (err) {
    throw new Exception(`Failed to create match between ${userId1} and ${userId2}`, 500);
  }
};

const getRoomByUserId = async (userId: string) => {
  const room = await RoomRepo.getRoomByUserId(userId);
  if (!room) {
    throw new Exception(`No room found for user ${userId}`, 404);
  }
  return room;
};

const updateRoomEndTime =async (userId: string) => {
  const updatedRoom = await RoomRepo.updateRoomEndTime(userId);
  if (!updatedRoom) {
    throw new Exception(`No room found for user ${userId}`, 404);
  }
  return updatedRoom;
}

const CollabService = {
  createMatch,
  getRoomByUserId,
  updateRoomEndTime,
};

export { CollabService as default };
