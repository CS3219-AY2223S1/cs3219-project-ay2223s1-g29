import { Room, RoomModel } from '../models/room';

const createRoom = async (room: Room) => {
  const newRoom = await RoomModel.create(room);
  return newRoom;
};

const getRoomByUserId = async (userId: string) => {
  const room = await RoomModel.findOne({
    $and: [{ $or: [{ userId1: userId }, { userId2: userId }] }, { endTime: { $gt: new Date() } }],
  }).select('-__v').lean();
  return room;
};

const RoomRepo = {
  createRoom,
  getRoomByUserId,
};

export { RoomRepo as default };
