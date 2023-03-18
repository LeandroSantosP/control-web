import { QueryClient, QueryClientProvider } from 'react-query';
import { RoutesApp } from './routes';

function App() {
   const queryClient = new QueryClient();

   return (
      <>
         <QueryClientProvider client={queryClient}>
            <RoutesApp />
         </QueryClientProvider>
      </>
   );
}

export { App };
