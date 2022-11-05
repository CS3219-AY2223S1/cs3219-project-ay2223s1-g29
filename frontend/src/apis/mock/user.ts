import { EmptyObj } from './../../utils.type';
import { LoginPostData, LoginResponse, RegisterPostData, RegisterResponse } from "../types/user.type";
import { ApiResponse } from "../interface";

async function register(d: RegisterPostData): Promise<ApiResponse<RegisterResponse>> {
  return {
    data: {
      id: '12345',
      username: d.username,
      token: 'tiktoktiktoken'
    },
    err: null
  }
}

async function login(d: LoginPostData): Promise<ApiResponse<LoginResponse>> {
  return {
    data: {
      id: '12345',
      username: d.username,
      token: 'tiktoktiktoken'
    },
    err: null
  }
}

async function deleteAccount(): Promise<ApiResponse<EmptyObj>> {
  return {
    data: {},
    err: null
  }
}

async function resetPassword(_password: string): Promise<ApiResponse<EmptyObj>> {
  return {
    data: {},
    err: null
  }
}

export default {
  register,
  login,
  deleteAccount,
  resetPassword
}