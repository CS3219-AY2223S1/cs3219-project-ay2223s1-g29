export type HistoryGetData = {
  records: {
    _id: string
    userId1: string
    userId2: string
    difficulty: "easy" | "medium" | "hard" | "random"
  }[],
  numRecords: number
}
