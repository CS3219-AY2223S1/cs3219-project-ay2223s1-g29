import { Socket } from 'socket.io-client';
import { EmptyObj } from './../utils.type';
import { GetRoomRes } from './types/collab.type';
import { HistoryGetData } from './types/history.type';
import { MatchPostData } from './types/matching.type';
import { LoginPostData, LoginResponse } from './types/user.type';
import { RegisterPostData, RegisterResponse } from "./types/user.type"

type Success<ResBody> = { data: ResBody, err: null }
type Error = {
  data: null, err: {
    response: {
      data: {
        message: string
      }
    }
  }
}

export type ApiResponse<ResBody> = Success<ResBody> | Error

export interface ApiServiceInterface {
  user: {
    register: (d: RegisterPostData) => Promise<ApiResponse<RegisterResponse>>
    login: (d: LoginPostData) => Promise<ApiResponse<LoginResponse>>
    deleteAccount: (token: string) => Promise<ApiResponse<EmptyObj>>
    resetPassword: (token: string, password: string) => Promise<ApiResponse<EmptyObj>>
  },
  collab: {
    getRoom: (token: string, username: string) => Promise<ApiResponse<GetRoomRes>>
    leaveRoom: (token: string) => Promise<ApiResponse<EmptyObj>>
  },
  matching: {
    requestForMatch: (token: string, d: MatchPostData) => Promise<ApiResponse<EmptyObj>>
  },
  history: {
    getHistory: (token: string, username: string) => Promise<ApiResponse<HistoryGetData>>
  }

  socket: Socket
}

export function isApiError<T>(d: ApiResponse<T>): d is Error {
  return !!d.err
}