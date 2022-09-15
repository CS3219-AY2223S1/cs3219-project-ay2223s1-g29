import { ApiResponse, ApiServiceInterface } from "../interface";
import { MatchPostData } from "../types/matching.type";
import user from './user'
import matching from './matching'

export class MockApiService implements ApiServiceInterface {
  user = {
    register: user.register,
    login: user.login
  };

  collab = {};

  matching = {
    requestForMatch: matching.requestForMatch
  };
}
