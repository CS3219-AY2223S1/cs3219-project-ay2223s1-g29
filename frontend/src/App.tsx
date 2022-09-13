import AuthenticatedApp from './apps/AuthenticatedApp';
import UnauthenticatedApp from './apps/UnauthenticatedApp';
import { useOptionalAuth } from './context/AuthContext';

function App() {
  const { token } = useOptionalAuth();

  if (!token) {
    return <UnauthenticatedApp />;
  } else {
    return <AuthenticatedApp />;
  }
}

export default App;
