import { createContext, useContext, useState } from 'react';
import { FlashMessage } from '../../components/FlashMessage/FlashMessage';

interface handleShowingFlashMessageProps {
   message: string;
   timer: number;
   type: 'success' | 'warning' | 'error' | 'default' | undefined;
}

interface FlashMessageProviderProps {
   FlashMessage:
      | {
           type: any;
        }
      | undefined;
   handleShowingFlashMessage: (props: handleShowingFlashMessageProps) => void;
}

const FlashMessageContext = createContext({} as FlashMessageProviderProps);

export const useFlashMessageContext = () => useContext(FlashMessageContext);

export const FlashMessageProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [showFlashMessage, setShowFlashMessage] = useState(false);
   const [timer, setTimer] = useState(0);
   const [messageContent, setMessageContent] = useState('');
   const [type, setType] = useState<
      'success' | 'warning' | 'error' | 'default' | undefined
   >();

   const handleShowingFlashMessage = ({
      message,
      timer,
      type,
   }: handleShowingFlashMessageProps) => {
      setType(type);
      setMessageContent(message);
      setShowFlashMessage(true);
      setTimer(timer);

      setTimeout(() => {
         setShowFlashMessage(false);
      }, timer);
      return;
   };

   return (
      <FlashMessageContext.Provider
         value={{
            FlashMessage: showFlashMessage ? (
               <FlashMessage
                  timeout={timer}
                  message={messageContent}
                  type={type}
               />
            ) : undefined,
            handleShowingFlashMessage,
         }}
      >
         {children}
      </FlashMessageContext.Provider>
   );
};
