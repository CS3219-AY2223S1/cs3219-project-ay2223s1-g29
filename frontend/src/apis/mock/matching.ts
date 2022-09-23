import { ApiResponse } from "../interface";
import { MatchPostData } from "../types/matching.type";

async function requestForMatch(token: string, d: MatchPostData): Promise<ApiResponse<{}>> {
  return {
    data: {},
    err: null
  }
}

export default {
  requestForMatch
}