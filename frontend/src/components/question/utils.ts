import { MatchPostData } from "../../apis/types/matching.type"

export const enum DIFFICULTY {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  RANDOM = 'Random',
}

export function getColor(difficulty: DIFFICULTY): string {
  switch (difficulty) {
    case DIFFICULTY.EASY:
      return "green.300"
    case DIFFICULTY.MEDIUM:
      return "yellow.400"
    case DIFFICULTY.HARD:
      return "pink.300"
    case DIFFICULTY.RANDOM:
    default:
      return "purple.300"
  }
}

const modes = ['easy', 'medium', 'hard']
export function serializeDifficulty(d: DIFFICULTY): MatchPostData['difficulty'] {
  switch (d) {
    case DIFFICULTY.EASY:
      return 'easy'
    case DIFFICULTY.MEDIUM:
      return 'medium'
    case DIFFICULTY.HARD:
      return 'hard'
    default:
      return modes[Math.floor(Math.random() * 3)] as MatchPostData['difficulty'];
  }
}