import { ApiServiceInterface } from './../interface';
import axios, { AxiosRequestHeaders } from 'axios';
import { RegisterPostData, RegisterResponse, LoginPostData } from '../../types/api/user.type';
import UserApi from './user';

export class ApiService implements ApiServiceInterface {
  user = {
    register: UserApi.register,
    login: UserApi.login
  };

  collab = {};
}

export const httpGet = async (url: string, headers: AxiosRequestHeaders, params?: any) =>
  axios({
    method: 'get',
    url,
    headers,
    params,
  });

export const httpPost = async (url: string, headers: AxiosRequestHeaders, data: any) =>
  axios({
    method: 'post',
    url,
    headers,
    data,
  });

export const httpPut = async (url: string, headers: AxiosRequestHeaders, data: any) =>
  axios({
    method: 'put',
    url,
    headers,
    data,
  });

export const httpDelete = async (url: string, headers: AxiosRequestHeaders) =>
  axios({
    method: 'delete',
    url,
    headers,
  });


