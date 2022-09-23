export type RegisterPostData = {
  username: string,
  password: string
}

export type RegisterResponse = {
  id: string,
  username: string,
  token: string
}

export type LoginPostData = {
  username: string,
  password: string
}

export type LoginResponse = RegisterResponse