import { ApiResponse, ApiServiceInterface } from './../interface';
import axios, { AxiosRequestHeaders } from 'axios';
import UserApi from './user';
import MatchingApi from './matching';
import CollabApi from './collab';
import { io } from 'socket.io-client';
import ENV from '../../env';
import HistoryApi from './history';

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

  history = {
    getHistory: HistoryApi.getHistory
  };

  socket = io(ENV.SOCKET_URL, {
    transports: ['websocket'],
    upgrade: false,
    reconnectionAttempts: 10000,
    autoConnect: false
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
    // timeout: 2000
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


