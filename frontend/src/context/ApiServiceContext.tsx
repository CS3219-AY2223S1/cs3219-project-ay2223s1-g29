import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { ApiService } from '../apis/http';
import { ApiServiceInterface } from '../apis/interface';
import { MockApiService } from '../apis/mock';

type ServiceType = 'real' | 'mock';

function getApiService(type: ServiceType): ApiServiceInterface {
  if (type === 'real') {
    return new ApiService();
  } else {
    return new MockApiService();
  }
}

const ApiServiceContext = createContext<ApiServiceInterface | null>(null);

const ApiServiceContextProvider = (props: { svcType?: ServiceType; children: ReactNode }) => {
  const apiService = getApiService(props.svcType ?? 'real');

  useEffect(() => {
    return () => {
      if (!apiService.socket) {
        return;
      }

      apiService.socket.disconnect();
    };
  }, []);

  return <ApiServiceContext.Provider value={apiService} children={props.children} />;
};

export default ApiServiceContextProvider;

export function useApiSvc(): ApiServiceInterface {
  const ctx = useContext(ApiServiceContext);

  if (!ctx) {
    throw new Error('useApiSvc must be used in a ApiServiceContextProvider');
  }

  return ctx;
}
