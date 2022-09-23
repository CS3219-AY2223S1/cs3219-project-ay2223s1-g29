import { EmptyObj } from './../../utils.type';
import { httpGet } from ".";
import ENV from "../../env";
import { ApiResponse } from "../interface";
import { getAuthHeader } from "../utils";

const BASE_URL = ENV.COLLAB_API

export default class CollabApi {
  // TODO
  static async getRoom(token: string): Promise<ApiResponse<EmptyObj>> {
    return httpGet(`${BASE_URL}`, {
      ...getAuthHeader(token)
    }, {})
      .then(res => ({ data: res.data, err: null }))
      .catch(err => ({ data: null, err }))
  }
}
