import { Socket } from 'socket.io-client';
import { EmptyObj } from './../utils.type';
import { GetRoomRes } from './types/collab.type';
import { MatchPostData } from './types/matching.type';
import { LoginPostData, LoginResponse } from './types/user.type';
import { RegisterPostData, RegisterResponse } from "./types/user.type"

type Success<ResBody> = { data: ResBody, err: null }
type Error = { data: null, err: string }

export type ApiResponse<ResBody> = Success<ResBody> | Error

export interface ApiServiceInterface {
  user: {
    register: (d: RegisterPostData) => Promise<ApiResponse<RegisterResponse>>
    login: (d: LoginPostData) => Promise<ApiResponse<LoginResponse>>
  },
  collab: {
    // TODO
    getRoom: (token: string, username: string) => Promise<ApiResponse<GetRoomRes>>
  },
  matching: {
    requestForMatch: (token: string, d: MatchPostData) => Promise<ApiResponse<EmptyObj>>
  },

  socket: Socket
}

export function isApiError<T>(d: ApiResponse<T>): d is Error {
  return !!d.err
}