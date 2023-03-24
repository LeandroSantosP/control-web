import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useState,
} from 'react';
import { CreateTransaction, getTransactions } from '../../api';
import { useMutation, UseMutationResult, UseQueryResult } from 'react-query';
import { useFlashMessageContext } from './FlashMessageContext';

interface FilterTransactionByMonthProps {
   month?: string;
}

interface Transaction {
   id: string;
   description: string;
   due_date: string | null;
   userId: string;
   isSubscription: boolean | null;
   installments: number | null;
   create_at: Date;
   recurrence: null;
   value: number;
   resolved: boolean;
   updated_at: Date;
}

interface TransactionDTO {
   transactions: Transaction[];
   balense: {
      expense: string;
      revenue: string;
      total: string;
   };
}

interface TransactionProps {
   CreateMutation: UseMutationResult<any, unknown, any, unknown>;
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   GetTransaction: ({ month }: FilterTransactionByMonthProps) => Promise<any>;
   transaction: TransactionDTO | undefined;

   getTotalBalense: () => Promise<any>;
}

const TransactionContext = createContext({} as TransactionProps);

export const useTransactionContext = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
   const [transaction, setTransition] = useState<TransactionDTO>();

   const { handleShowingFlashMessage } = useFlashMessageContext();
   const [open, setOpen] = useState(false);

   const CreateMutation = useMutation({
      mutationFn: async (data: any) => {
         return await CreateTransaction(data);
      },

      onSuccess: () => {
         setOpen(false);
         handleShowingFlashMessage({
            message: 'Transação Criada com sucesso!',
            timer: 2000,
            type: 'success',
         });
         return;
      },
   });

   const GetTransaction = useCallback(
      async ({ month }: FilterTransactionByMonthProps) => {
         const result = await getTransactions({
            month,
         });

         if (result?.monthBalense) {
            setTransition({
               balense: result.monthBalense,
               transactions: result.transactions,
            });
            return;
         }

         setTransition(result);
         return;
      },
      []
   );

   const getTotalBalense = useCallback(async () => {
      const result = await getTransactions({});
      return result;
   }, []);
   return (
      <TransactionContext.Provider
         value={{
            CreateMutation,
            getTotalBalense,
            open,
            setOpen,
            GetTransaction,
            transaction,
         }}
      >
         {children}
      </TransactionContext.Provider>
   );
};
