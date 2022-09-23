import { LoginPostData, RegisterPostData, RegisterResponse, LoginResponse } from '../types/user.type';
import ENV from "../../env";
import { httpPost } from '.'
import { AxiosPromise } from 'axios';
import { ApiResponse } from '../interface';

const BASE_URL = `${ENV.USER_API}`

export default class UserApi {
  static async register(d: RegisterPostData): Promise<ApiResponse<RegisterResponse>> {
    return httpPost(`${BASE_URL}/register`, {}, d)
      .then(res => ({ data: res.data, err: null }))
      .catch(err => ({ data: null, err }))
  }

  static async login(d: LoginPostData): Promise<ApiResponse<LoginResponse>> {
    return httpPost(`${BASE_URL}/login`, {}, d)
      .then(res => ({ data: res.data, err: null }))
      .catch(err => ({ data: null, err }))
  }
}
