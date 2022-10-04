
import mongoose from 'mongoose';

export interface Question {
  question: string;
}

const questionSchema = new mongoose.Schema({
  difficulty: String,  
  question: String,
});

export const QuestionModel = mongoose.model<Question>('questions', questionSchema);