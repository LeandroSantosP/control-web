import { FlashMessage } from './components/FlashMessage/FlashMessage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useAuth } from './shared/contexts/AuthContext';
import { RoutesApp } from './routes';
import { useStorage } from './shared/modules/Storage';

function App() {
  const { isLogged } = useAuth();
  const { setState, state } = useStorage();

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* {isLogged && <FlashMessage type="success" message="logado" />} */}
        <RoutesApp />
      </QueryClientProvider>
    </>
  );
}

export { App };
