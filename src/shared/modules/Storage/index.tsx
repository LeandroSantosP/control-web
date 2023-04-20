import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { AuthCredentials } from '../../../api';

interface StorageProviderProps {
   children: React.ReactNode;
   persistenceAdepter: {
      getItem: () => Promise<any>;
      setItem: (data: any) => Promise<void>;
   };
}

interface userInfos {
   user?: {
      name: string;
      email: string;
   };
   token: string;
}

interface test2 {
   state: userInfos;
   setState: () => any;
}

const InMemoryStorageContext = createContext({} as test2);

const InMemoryStorageProvider = ({
   persistenceAdepter,
   children,
}: StorageProviderProps) => {
   const [state, setState] = useState({});

   const handle = useCallback(async () => {
      const infos = await persistenceAdepter.getItem();

      console.log(infos);

      if (infos !== null) {
         AuthCredentials(infos.token);
         setState(infos);
         await persistenceAdepter.setItem(infos);
      }
   }, [persistenceAdepter]);

   useEffect(() => {
      handle();
   }, [handle]);

   return (
      <InMemoryStorageContext.Provider
         value={{ setState: setState as any, state: state as any }}
      >
         {children}
      </InMemoryStorageContext.Provider>
   );
};

export const StorageProvider = ({
   children,
   persistenceAdepter,
}: StorageProviderProps) => {
   return (
      <InMemoryStorageProvider persistenceAdepter={persistenceAdepter}>
         {children}
      </InMemoryStorageProvider>
   );
};

export const useStorage = () => useContext(InMemoryStorageContext);
