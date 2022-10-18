import Peer from 'peerjs';

export type IOptionalAuthContext = {
  token: string | undefined;
  username: string | undefined;
  userId: string | undefined;
  setAuth: (
    user: {
      id: string;
      username: string;
    },
    token: string,
  ) => void;
  clearAuth: () => void;
  peer: Peer | undefined;
};

export type IAuthContext = {
  token: string;
  username: string;
  userId: string;
  setAuth: (
    user: {
      id: string;
      username: string;
    },
    token: string,
  ) => void;
  clearAuth: () => void;
  peer: Peer | undefined;
};
