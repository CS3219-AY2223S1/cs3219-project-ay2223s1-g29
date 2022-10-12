import { GetRoomRes } from './../types/collab.type';
import { EmptyObj } from './../../utils.type';
import { httpGet } from ".";
import ENV from "../../env";
import { ApiResponse } from "../interface";
import { getAuthHeader } from "../utils";

type RawGetRoomRes = {
  room: Omit<GetRoomRes, 'altUser'>
}

const BASE_URL = ENV.COLLAB_API

export default class CollabApi {
  static async getRoom(token: string, username: string): Promise<ApiResponse<GetRoomRes>> {
    return httpGet(`${BASE_URL}/status`, {
      ...getAuthHeader(token)
    }, {})
      .then(res => {
        const raw: RawGetRoomRes = res.data
        let altUser = raw.room.userId1

        const data = {
          ...raw.room,
          altUser
        }

        if (altUser === username) {
          data.altUser = raw.room.userId2
        }

        return { data, err: null }
      })
      .catch(err => ({ data: null, err }))
  }
}
