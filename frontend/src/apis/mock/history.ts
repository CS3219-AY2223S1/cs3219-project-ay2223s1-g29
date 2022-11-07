import { ApiResponse } from "../interface"
import { HistoryGetData } from "../types/history.type"

async function getHistory(token: string, username: string): Promise<ApiResponse<HistoryGetData>> {
  return ({
    data: {
      records: [],
      numRecords: 0
    }, err: null
  })
}

export default {
  getHistory
}
