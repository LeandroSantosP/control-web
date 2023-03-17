import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface StorageProviderProps {
  children: React.ReactNode;
  persistenceAdepter: {
    getItem: () => Promise<any>;
    setItem: (data: any) => Promise<void>;
  };
}

interface userInfos {
  user: {
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

    if (infos !== null) {
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

export const useStorage = () => {
  const { setState, state } = useContext(InMemoryStorageContext);

  return { state, setState };
};
