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