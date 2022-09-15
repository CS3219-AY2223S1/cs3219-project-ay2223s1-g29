import { ApiServiceInterface } from "../interface";
import user from './user'

export class MockApiService implements ApiServiceInterface {
  user = {
    register: user.register,
    login: user.login
  };

  collab = {};
}