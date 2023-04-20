import { LocalStoreOperator } from './persistence-adepter/adepter';

interface UseProps<T> {
   setItem?: (data: T) => Promise<void>;
   getItem?: () => Promise<any>;
   data?: T;
}

export class useLocalStorage<T> {
   public data: any;

   constructor(private LocalStoreOperator: LocalStoreOperator) {
      this.data = '';
   }

   private async Use({ setItem, getItem, data }: UseProps<T>) {
      if (setItem && data) {
         await setItem(data);
      }

      if (getItem) {
         return await getItem();
      }
      return;
   }

   async StorageProvider({
      operationType,
      data,
   }: {
      operationType: 'get' | 'set';
      data?: any;
   }): Promise<void> {
      if (operationType === 'get') {
         const credentials = await this.Use({
            getItem: this.LocalStoreOperator.getItem,
         });
         this.data = credentials;
         return;
      }
      if (['set'].includes(operationType) && [null, undefined].includes(data)) {
         throw new Error('data is required');
      }

      await this.Use({
         setItem: this.LocalStoreOperator.setItem,
         data,
      });

      return;
   }
}
