import { Room, RoomModel } from '../models/room';

const createRoom = async (room: Room) => {
  const newRoom= await RoomModel.create(room);
  return newRoom;
};

const RoomRepo = {
  createRoom,
};

export { RoomRepo as default };
