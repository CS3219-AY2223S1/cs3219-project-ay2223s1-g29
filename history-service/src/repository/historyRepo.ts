import { RoomModel } from '../models/room';

const queryBuilder = (userId1: String, userId2: String, difficulty: String, questionId: String) => {
  // only add fields to the query if they are not null
  // userId1 and userId2 are OR'd together
  const query = {};
  if (userId1) {
    query['$or'] = [{ userId1 }, { userId2: userId1, }];
  }
  if (userId2) {
    query['$or'] = [{ userId1: userId2, }, { userId2 }];
  }
  if (difficulty) {
    query['difficulty'] = difficulty;
  }
  if (questionId) {
    query['questionId'] = questionId;
  }
  return query;
};

const getStats = async (userId1: String, userId2: String, difficulty: String, questionId: String) => {
  // Look through roomModel and get the number of records that match the userId1, userId2, difficulty, and questionId,
  // Any of the userIds can be null, and the difficulty and questionId can be null
  const query = queryBuilder(userId1, userId2, difficulty, questionId);
  const stats = await RoomModel.find(query).select('userId1 userId2 difficulty questionId endTime');
  return stats;
}

const HistoryRepo = {
  getStats,
};

export { HistoryRepo as default };
