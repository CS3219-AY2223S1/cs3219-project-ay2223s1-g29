import { LoginPostData, LoginResponse } from './../types/api/user.type';
import { RegisterPostData, RegisterResponse } from "../types/api/user.type"

type Success<ResBody> = { data: ResBody, err: null }
type Error = { data: null, err: string }

export type ApiResponse<ResBody> = Success<ResBody> | Error

export interface ApiServiceInterface {
  user: {
    register: (d: RegisterPostData) => Promise<ApiResponse<RegisterResponse>>
    login: (d: LoginPostData) => Promise<ApiResponse<LoginResponse>>
  },
  collab: {

  }
}

export function isApiError<T>(d: ApiResponse<T>): d is Error {
  return !!d.err
}