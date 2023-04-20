import { RoutesApp } from './routes';
import { TransactionProvider } from './shared/contexts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FlashMessageProvider } from './shared/contexts/FlashMessageContext';
import { authStorage } from './shared/store/AuthContext/AuthContext';

function App() {
   const queryClient = new QueryClient();
   const {
      actions: { getCredentials },
   } = authStorage();

   getCredentials().then((props) => {
      console.log({ props });
   });

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
