import { LoginPostData, LoginResponse, RegisterPostData, RegisterResponse } from "../../types/api/user.type";
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

export default {
  register,
  login
}