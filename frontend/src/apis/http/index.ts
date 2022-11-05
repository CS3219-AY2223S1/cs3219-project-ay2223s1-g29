import { ApiServiceInterface } from './../interface';
import axios, { AxiosRequestHeaders } from 'axios';
import UserApi from './user';
import MatchingApi from './matching';
import CollabApi from './collab';
import { io } from 'socket.io-client';
import ENV from '../../env';

export class ApiService implements ApiServiceInterface {
  user = {
    register: UserApi.register,
    login: UserApi.login,
    deleteAccount: UserApi.deleteAccount,
    resetPassword: UserApi.resetPassword
  };

  collab = {
    getRoom: CollabApi.getRoom,
    leaveRoom: CollabApi.leaveRoom,
  };

  matching = {
    requestForMatch: MatchingApi.requestForMatch
  };

  socket = io(ENV.SOCKET_URL, {
    reconnectionAttempts: 10000
  });
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

export const httpPatch = async (url: string, headers: AxiosRequestHeaders, data: any) =>
  axios({
    method: 'patch',
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


