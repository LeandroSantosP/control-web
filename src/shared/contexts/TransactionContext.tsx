import { createContext, ReactNode, useContext, useState } from 'react';
import { CreateTransaction } from '../../api';
import { useMutation, UseMutationResult } from 'react-query';
import { useFlashMessageContext } from './FlashMessageContext';

interface TransactionProps {
   CreateMutation: UseMutationResult<any, unknown, any, unknown>;
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionContext = createContext({} as TransactionProps);

export const useTransactionContext = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
   const { handleShowingFlashMessage } = useFlashMessageContext();
   const [open, setOpen] = useState(false);
   const CreateMutation = useMutation({
      mutationFn: async (data: any) => {
         return await CreateTransaction(data);
      },
      onSuccess: (data) => {
         setOpen(false);
         handleShowingFlashMessage({
            message: 'Transação Criada com sucesso!',
            timer: 2000,
            type: 'success',
         });
         return console.log(data);
      },
   });

   return (
      <TransactionContext.Provider value={{ CreateMutation, open, setOpen }}>
         {children}
      </TransactionContext.Provider>
   );
};
