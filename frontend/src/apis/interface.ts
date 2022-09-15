import { EmptyObj } from './../utils.type';
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

  },
  matching: {
    requestForMatch: (token: string, d: MatchPostData) => Promise<ApiResponse<EmptyObj>>
  }
}

export function isApiError<T>(d: ApiResponse<T>): d is Error {
  return !!d.err
}