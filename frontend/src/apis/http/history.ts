import { httpGet } from "."
import ENV from "../../env"
import { ApiResponse } from "../interface"
import { HistoryGetData } from "../types/history.type"
import { getAuthHeader } from "../utils"

const BASE_URL = ENV.HISTORY_API

export default class HistoryApi {
  static async getHistory(token: string, username: string): Promise<ApiResponse<HistoryGetData>> {
    return httpGet(`${BASE_URL}?userId1=${username}`, {
      ...getAuthHeader(token)
    }, {})
      .then(res => ({ data: res.data, err: null }))
      .catch(err => ({ data: null, err }))
  }
}
