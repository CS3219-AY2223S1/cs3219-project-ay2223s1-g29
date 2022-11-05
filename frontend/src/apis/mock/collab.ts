import { EmptyObj } from "../../utils.type";
import { ApiResponse } from "../interface";
import { GetRoomRes } from "../types/collab.type";

async function getRoom(token: string, username: string): Promise<ApiResponse<GetRoomRes>> {
  const rand = Math.random()

  if (rand >= 0.6) {
    return {
      data: {
        _id: '123',
        userId1: 'jieffy',
        userId2: 'bananax',
        altUser: 'bananax',
        question: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit nisi, semper nec eros eget, mattis viverra leo. Pellentesque semper ultricies elit. Suspendisse in maximus velit, a fermentum arcu. Aliquam sagittis fringilla felis eu dapibus. Sed sed ligula et dolor ultrices eleifend. Maecenas tempus nulla tellus, quis volutpat libero accumsan et. Sed tempus dignissim urna, vel lobortis erat porta id. Quisque pharetra lacinia varius. Proin placerat, eros ac porta interdum, diam orci iaculis ante, non tincidunt elit lectus vel quam. Sed varius enim eget nisi scelerisque suscipit. Nunc vitae tortor id urna finibus elementum ac in tellus. Etiam leo libero, porttitor a bibendum ac, sagittis ut lacus. Nulla elementum et massa ut vulputate.
  
  Pellentesque non felis turpis. Morbi vel mattis metus, ut tincidunt purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, magna lacinia sollicitudin sodales, risus augue gravida erat, eget posuere massa magna quis nulla. Proin sodales risus ac nunc faucibus, ac interdum massa sagittis. Nullam maximus hendrerit erat, vel convallis neque aliquet non. Pellentesque vel commodo ligula. Proin in tortor sit amet dolor suscipit venenatis maximus at quam. Suspendisse tincidunt venenatis mattis. Aenean rhoncus est nec eros maximus egestas. Pellentesque justo est, maximus feugiat varius et, posuere eu eros. Fusce sed feugiat arcu.
  
  Duis sed euismod arcu. Maecenas sit amet justo interdum, eleifend purus et, aliquam ex. Ut at arcu non leo porta ornare. Maecenas ut ante enim. Duis commodo sem sit amet aliquam egestas. Donec nisl massa, vehicula eu orci ac, malesuada rutrum nisl. Quisque scelerisque dictum semper. Duis urna lectus, gravida non pretium non, suscipit et erat. Nullam eget ex lacus. Donec id massa sagittis, tincidunt orci in, iaculis ante. Donec volutpat magna quis quam dictum accumsan. Donec vestibulum in justo ut blandit. Quisque nec gravida orci. Morbi faucibus varius finibus.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit nisi, semper nec eros eget, mattis viverra leo. Pellentesque semper ultricies elit. Suspendisse in maximus velit, a fermentum arcu. Aliquam sagittis fringilla felis eu dapibus. Sed sed ligula et dolor ultrices eleifend. Maecenas tempus nulla tellus, quis volutpat libero accumsan et. Sed tempus dignissim urna, vel lobortis erat porta id. Quisque pharetra lacinia varius. Proin placerat, eros ac porta interdum, diam orci iaculis ante, non tincidunt elit lectus vel quam. Sed varius enim eget nisi scelerisque suscipit. Nunc vitae tortor id urna finibus elementum ac in tellus. Etiam leo libero, porttitor a bibendum ac, sagittis ut lacus. Nulla elementum et massa ut vulputate.
  
  Pellentesque non felis turpis. Morbi vel mattis metus, ut tincidunt purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum, magna lacinia sollicitudin sodales, risus augue gravida erat, eget posuere massa magna quis nulla. Proin sodales risus ac nunc faucibus, ac interdum massa sagittis. Nullam maximus hendrerit erat, vel convallis neque aliquet non. Pellentesque vel commodo ligula. Proin in tortor sit amet dolor suscipit venenatis maximus at quam. Suspendisse tincidunt venenatis mattis. Aenean rhoncus est nec eros maximus egestas. Pellentesque justo est, maximus feugiat varius et, posuere eu eros. Fusce sed feugiat arcu.
  
  Duis sed euismod arcu. Maecenas sit amet justo interdum, eleifend purus et, aliquam ex. Ut at arcu non leo porta ornare. Maecenas ut ante enim. Duis commodo sem sit amet aliquam egestas. Donec nisl massa, vehicula eu orci ac, malesuada rutrum nisl. Quisque scelerisque dictum semper. Duis urna lectus, gravida non pretium non, suscipit et erat. Nullam eget ex lacus. Donec id massa sagittis, tincidunt orci in, iaculis ante. Donec volutpat magna quis quam dictum accumsan. Donec vestibulum in justo ut blandit. Quisque nec gravida orci. Morbi faucibus varius finibus.`
      }
      ,
      err: null
    }
  } else {
    return {
      data: null,
      err: {
        response: {
          data: {
            message: 'err'
          }
        }
      }
    }
  }

}

async function leaveRoom(token: string): Promise<ApiResponse<EmptyObj>> {
  return ({ data: {}, err: null })
}

export default {
  getRoom,
  leaveRoom
}