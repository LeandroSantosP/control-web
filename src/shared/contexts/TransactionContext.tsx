import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import {
   CreateTransaction,
   getTransactionBySubscription,
   getTransactionBySubscriptionProps,
   getTransactions,
} from '../../api';
import { useMutation, UseMutationResult } from 'react-query';
import { useFlashMessageContext } from './FlashMessageContext';
import { useAuth } from './AuthContext';

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

type GetTransactionBySubscriptionProps = {
   balense: { expense: string; revenue: string; total: string };
   transactions: any[];
};

interface TransactionProps {
   CreateMutation: UseMutationResult<any, unknown, any, unknown>;
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   GetTransaction: ({ month }: FilterTransactionByMonthProps) => Promise<any>;
   GetTransactionBySubscription: (
      props: getTransactionBySubscriptionProps
   ) => Promise<any>;
   transaction: TransactionDTO | undefined;
   getTotalBalense: () => Promise<any>;
}

const TransactionContext = createContext({} as TransactionProps);

export const useTransactionContext = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
   const { logout } = useAuth();
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

   const GetTransactionBySubscription = useCallback(
      async ({ isSubscription, month }: getTransactionBySubscriptionProps) => {
         try {
            const result =
               await getTransactionBySubscription<GetTransactionBySubscriptionProps>(
                  {
                     isSubscription,
                     month,
                  }
               );

            if (result?.balense) {
               setTransition({
                  balense: result.balense,
                  transactions: result.transactions,
               });
            }

            return;
         } catch (error: any) {
            if (
               error.response.status &&
               error.response.data.message === 'Invalid Token'
            ) {
               logout();
            }
         }
      },
      [logout]
   );

   const GetTransaction = useCallback(
      async ({ month }: FilterTransactionByMonthProps) => {
         try {
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
         } catch (err: any) {
            if (
               err.response.status &&
               err.response.data.message === 'Invalid Token'
            ) {
               logout();
            }
         }
      },
      [logout]
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
            GetTransactionBySubscription,
         }}
      >
         {children}
      </TransactionContext.Provider>
   );
};
