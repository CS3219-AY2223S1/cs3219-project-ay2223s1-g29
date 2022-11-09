import { ApiResponse, ApiServiceInterface } from "../interface";
import user from './user'
import matching from './matching'
import history from './history'
import collab from './collab'
import { io } from "socket.io-client";

export class MockApiService implements ApiServiceInterface {
  user = {
    register: user.register,
    login: user.login,
    deleteAccount: user.deleteAccount,
    resetPassword: user.resetPassword
  };

  collab = {
    getRoom: collab.getRoom,
    leaveRoom: collab.leaveRoom
  };

  matching = {
    requestForMatch: matching.requestForMatch
  };

  history = {
    getHistory: history.getHistory
  };

  socket = io({
    reconnectionAttempts: 1,
    autoConnect: false
  });
}
