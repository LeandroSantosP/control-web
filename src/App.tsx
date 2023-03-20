import { QueryClient, QueryClientProvider } from 'react-query';
import { RoutesApp } from './routes';
import { TransactionProvider } from './shared/contexts';
import { FlashMessageProvider } from './shared/contexts/FlashMessageContext';

function App() {
   const queryClient = new QueryClient();

   return (
      <>
         <QueryClientProvider client={queryClient}>
            <FlashMessageProvider>
               <TransactionProvider>
                  <RoutesApp />
               </TransactionProvider>
            </FlashMessageProvider>
         </QueryClientProvider>
      </>
   );
}

export { App };
