import { LoginPostData, RegisterPostData, RegisterResponse, LoginResponse } from '../types/api/user.type';
import ENV from "../env";
import { httpPost } from './http'
import { AxiosPromise } from 'axios';

const BASE_URL = `${ENV.USER_API}`

export default class UserApi {
  static register(d: RegisterPostData): AxiosPromise<RegisterResponse> {
    return httpPost(`${BASE_URL}/register`, {}, d)
  }

  static login(d: LoginPostData): AxiosPromise<LoginResponse> {
    return httpPost(`${BASE_URL}/login`, {}, d)
  }
}
