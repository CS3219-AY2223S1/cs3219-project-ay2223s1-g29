import { EmptyObj } from "../../utils.type";
import { ApiResponse } from "../interface";

async function getRoom(token: string): Promise<ApiResponse<EmptyObj>> {
  const rand = Math.random()

  if (rand >= 0.6) {
    return {
      data: {
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