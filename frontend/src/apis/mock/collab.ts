import { EmptyObj } from "../../utils.type";
import { ApiResponse } from "../interface";
import { GetRoomRes } from "../types/collab.type";

async function getRoom(token: string): Promise<ApiResponse<GetRoomRes>> {
  const rand = Math.random()

  if (rand >= 0.6) {
    return {
      data: {
        roomId: '123',
        altUser: 'bananananana'
      },
      err: null
    }
  } else {
    return {
      data: null,
      err: 'NOT_FOUND'
    }
  }

}

export default {
  getRoom
}