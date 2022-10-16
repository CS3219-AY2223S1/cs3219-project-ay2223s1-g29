import { LoginPostData, RegisterPostData, RegisterResponse, LoginResponse } from '../types/user.type';
import ENV from "../../env";
import { httpDelete, httpPatch, httpPost } from '.'
import { AxiosPromise } from 'axios';
import { ApiResponse } from '../interface';
import { EmptyObj } from '../../utils.type';
import { getAuthHeader } from '../utils';

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

  static async deleteAccount(token: string): Promise<ApiResponse<EmptyObj>> {
    return httpDelete(`${BASE_URL}`, {
      ...getAuthHeader(token)
    })
      .then(() => ({ data: {}, err: null }))
      .catch(err => ({ data: null, err }))
  }

  static async resetPassword(token: string, password: string): Promise<ApiResponse<EmptyObj>> {
    return httpPatch(`${BASE_URL}/`, {
      ...getAuthHeader(token)
    }, {
      password
    })
      .then(() => ({ data: {}, err: null }))
      .catch(err => ({ data: null, err }))
  }
}
