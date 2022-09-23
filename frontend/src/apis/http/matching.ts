import { EmptyObj } from './../../utils.type';
import ENV from "../../env";
import { httpPost } from '.'
import { ApiResponse } from '../interface';
import { MatchPostData } from '../types/matching.type';
import { getAuthHeader } from '../utils';

const BASE_URL = ENV.MATCHING_API

export default class MatchingApi {
  static async requestForMatch(token: string, d: MatchPostData): Promise<ApiResponse<EmptyObj>> {
    return httpPost(`${BASE_URL}/match`, {
      ...getAuthHeader(token)
    }, d)
      .then(res => ({ data: res.data, err: null }))
      .catch(err => ({ data: null, err }))
  }
}
