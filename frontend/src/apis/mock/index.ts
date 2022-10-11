import { ApiServiceInterface } from "../interface";
import user from './user'
import matching from './matching'
import collab from './collab'
import { io } from "socket.io-client";

export class MockApiService implements ApiServiceInterface {
  user = {
    register: user.register,
    login: user.login
  };

  collab = {
    getRoom: collab.getRoom
  };

  matching = {
    requestForMatch: matching.requestForMatch
  };

  socket = io();
}
