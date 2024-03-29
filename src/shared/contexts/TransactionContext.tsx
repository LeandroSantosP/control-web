import { AxiosResponse } from 'axios';
import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useState,
} from 'react';
import { useMutation, UseMutationResult } from 'react-query';

import {
   CreatePdfApi,
   CreatePdfApiProps,
   CreateTransaction,
   DeleteTransactionAPI,
   EditTransaction,
   editTransactionProps,
   getTransactionByParams,
   getTransactionByParamsProps,
   getTransactions,
   ResolvedTransactionApi,
} from '../../api';

import { authStorage } from '../store/AuthContext/AuthContext';
import { useFlashMessageContext } from './FlashMessageContext';

interface FilterTransactionByMonthProps {
   month?: string;
}

export interface Transaction {
   id: string;
   description: string;
   due_date: string | null;
   userId: string;
   isSubscription: boolean | null;
   installments: number | null;
   created_at: Date;
   recurrence: null;
   type: string;
   filingDate: string | null;
   value: string;
   resolved: boolean;
   updated_at: Date;
   category: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
   };
}

interface TransactionDTO {
   transactions: Transaction[];
   balense?: {
      expense: string;
      revenue: string;
      total: string;
   };
   monthBalense?: {
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
   GetTransactionByParams: (props: getTransactionByParamsProps) => Promise<any>;
   transaction: TransactionDTO | undefined;
   getTotalBalense: () => Promise<any>;
   ResolvedTransaction: (props: string) => Promise<void | any>;
   DeleteTransaction: (transactionId: string) => Promise<void>;
   EditTransactionRequest: (params: editTransactionProps) => Promise<boolean>;
   CreatePdf: (params: CreatePdfApiProps) => Promise<Buffer>;
   currentTransactionType: 'revenue' | 'expense';
   setCurrentTransactionType: React.Dispatch<
      React.SetStateAction<'revenue' | 'expense'>
   >;
}

const TransactionContext = createContext({} as TransactionProps);

export const useTransactionContext = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
   const [currentTransactionType, setCurrentTransactionType] = useState<
      'revenue' | 'expense'
   >('expense');
   const { actions } = authStorage();
   const [transaction, setTransition] = useState<TransactionDTO>({
      balense: {
         expense: '0',
         revenue: '0',
         total: '0',
      },
      transactions: [],
   });

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
            type: 'success',
            haveButton: false,
            timer: 2000,
         });
         return;
      },
   });

   const ResolvedTransaction = useCallback(
      async (transactionId: string): Promise<void> => {
         try {
            const confirmeFinalization = confirm(
               'Realmente deseja finalizar essa transação ?'
            );

            if (confirmeFinalization) {
               const response = await ResolvedTransactionApi(transactionId);

               handleShowingFlashMessage({
                  message: 'Transação finalizada com sucesso!',
                  timer: 3000,
                  type: 'success',
                  haveButton: false,
               });
               return response;
            }

            handleShowingFlashMessage({
               message: 'Finalização Cancela!',
               timer: 3000,
               type: 'default',
               haveButton: false,
            });
            return;
         } catch (err: any) {
            if (
               err.response.status &&
               err.response.data.message === 'Invalid Token'
            ) {
               actions.logout();
            }
         }
      },
      [actions, handleShowingFlashMessage]
   );

   const GetTransaction = useCallback(
      async ({ month }: FilterTransactionByMonthProps) => {
         try {
            const result = await getTransactions<TransactionDTO>({
               month,
            });

            if (!result) {
               return;
            }

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
               actions.logout();
            }
         }
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [actions.logout, ResolvedTransaction]
   );

   const CreatePdf = async (params: CreatePdfApiProps): Promise<Buffer> => {
      try {
         const response = await CreatePdfApi(params);
         return response;
      } catch (error: any) {
         return error;
      }
   };

   const EditTransactionRequest = async (params: editTransactionProps) => {
      try {
         const response = await EditTransaction({ ...params });

         if (response.status === 204) {
            await GetTransaction({});
            return true;
         }

         return false;
      } catch (error) {
         return false;
      }
   };

   const GetTransactionByParams = useCallback(
      async ({
         isSubscription,
         month,
         resolved,
         revenue,
      }: getTransactionByParamsProps) => {
         try {
            const result =
               await getTransactionByParams<GetTransactionBySubscriptionProps>({
                  isSubscription,
                  month,
                  resolved,
                  revenue,
               });

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
               actions.logout();
            }
         }
      },
      [actions]
   );

   const DeleteTransaction = useCallback(
      async (transactionId: string) => {
         await DeleteTransactionAPI<void, AxiosResponse<void, any> | undefined>(
            transactionId
         );
         await GetTransaction({});
         return;
      },
      [GetTransaction]
   );

   const getTotalBalense = useCallback(async () => {
      const result = await getTransactions<TransactionDTO>({});

      return result;
   }, []);

   return (
      <TransactionContext.Provider
         value={{
            CreatePdf,
            EditTransactionRequest,
            CreateMutation,
            ResolvedTransaction,
            getTotalBalense,
            open,
            setOpen,
            GetTransaction,
            transaction,
            GetTransactionByParams,
            DeleteTransaction,
            currentTransactionType,
            setCurrentTransactionType,
         }}
      >
         {children}
      </TransactionContext.Provider>
   );
};
