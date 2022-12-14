import Peer from 'peerjs';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';
import { IOptionalAuthContext, IAuthContext } from './types/AuthContext';

const AuthContext = createContext<IOptionalAuthContext | null>(null);

const AuthContextProvider = (props: { children: ReactNode }) => {
  const [cookie, setCookie, removeCookie] = useCookies(['cs3219-prpr-t']);

  const [username, setUsername] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();

  const [token, setToken] = useState<string | undefined>(() => {
    const token = cookie['cs3219-prpr-t'];

    if (!token) {
      return undefined;
    } else {
      return token;
    }
  });

  const [peer, setPeer] = useState<Peer | undefined>();

  useEffect(() => {
    if (!token) {
      return;
    }

    const username = localStorage.getItem('cs3219-prpr-uname');
    const userId = localStorage.getItem('cs3219-prpr-uid');
    if (!username || !userId) {
      return;
    }

    setUsername(username);
    setUserId(userId);
  }, [token]);

  const setAuth = useCallback(
    (
      user: {
        id: string;
        username: string;
      },
      token: string,
    ) => {
      setCookie('cs3219-prpr-t', token);
      localStorage.setItem('cs3219-prpr-uname', user.username);
      localStorage.setItem('cs3219-prpr-uid', user.id);
      setToken(token);
    },
    [],
  );

  const clearAuth = useCallback(() => {
    localStorage.clear();
    removeCookie('cs3219-prpr-t');
  }, []);

  useLayoutEffect(() => {
    if (!username) {
      return;
    }

    const peer = new Peer(`cs3219-call-${username}`, {
      debug: 3,
    });
    peer.on('error', (err) => {
      console.error(err);
      console.error(err.stack);
    });

    setPeer(peer);

    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, [username]);

  return (
    <AuthContext.Provider
      value={{ username, token, userId, setAuth, clearAuth, peer }}
      {...props}
    />
  );
};

export default AuthContextProvider;

export function useOptionalAuth(): IOptionalAuthContext {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useOptionalAuth must be used in a AuthContextProvider');
  }
  return ctx;
}

export function useAuth(): IAuthContext {
  const ctx = useContext(AuthContext);

  if (!ctx || !ctx.token || !ctx.username) {
    throw new Error('useAuth must be used in a AuthContextProvider');
  }

  return ctx as IAuthContext;
}
