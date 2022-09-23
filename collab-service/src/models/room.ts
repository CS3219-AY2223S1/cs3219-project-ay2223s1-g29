import mongoose from 'mongoose';

export interface Room {
  _id?: string;
  userId1: string;
  userId2: string;
  difficulty: string;
  question: string;
}

const roomSchema = new mongoose.Schema({
  userId1: {
    type: String,
    required: true,
  },
  userId2: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

export const RoomModel = mongoose.model<Room>('room', roomSchema);
