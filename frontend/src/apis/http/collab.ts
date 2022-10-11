import { GetRoomRes } from './../types/collab.type';
import { EmptyObj } from './../../utils.type';
import { httpGet } from ".";
import ENV from "../../env";
import { ApiResponse } from "../interface";
import { getAuthHeader } from "../utils";

const BASE_URL = ENV.COLLAB_API

export default class CollabApi {
  // TODO
  static async getRoom(token: string): Promise<ApiResponse<GetRoomRes>> {
    return httpGet(`${BASE_URL}/status`, {
      ...getAuthHeader(token)
    }, {})
      .then(res => ({ data: res.data, err: null }))
      .catch(err => ({ data: null, err }))
  }
}
