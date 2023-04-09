import { createContext, useContext, useEffect, useState } from 'react';
import { FlashMessage } from '../../components/Molecules/FlashMessage/FlashMessage';
import GetNotifications from '../../interfaces/firebase/GetRegistrationToken';

interface handleShowingFlashMessageProps {
   message: string;
   timer: number;
   type: 'success' | 'warning' | 'error' | 'default' | undefined;
   haveButton: boolean;
   FistTextButton?: string;
   SecondTextButton?: string;
}

interface FlashMessageProviderProps {
   FlashMessage:
      | {
           type: any;
        }
      | undefined;
   handleShowingFlashMessage: (props: handleShowingFlashMessageProps) => void;
   answer?: 'accept' | 'reject' | undefined;
}

const FlashMessageContext = createContext({} as FlashMessageProviderProps);

export const useFlashMessageContext = () => useContext(FlashMessageContext);

export const FlashMessageProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const [FistButtonText, setFistButtonText] = useState<string | undefined>(
      'Clicar'
   );
   const [secondButtonText, setSecondButtonText] = useState<string | undefined>(
      'Clicar'
   );
   const [showFlashMessage, setShowFlashMessage] = useState(false);
   const [haveButton, setHaveButton] = useState(false);
   const [answer, setAnswer] = useState<'accept' | 'reject' | undefined>();
   const [messageContent, setMessageContent] = useState('');
   const [type, setType] = useState<
      'success' | 'warning' | 'error' | 'default' | undefined
   >();

   useEffect(() => {
      GetNotifications.getMessages();
   }, []);

   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if ((e.target as HTMLButtonElement).innerText === 'Confirmar') {
         setAnswer('accept');
         return;
      } else if ((e.target as HTMLButtonElement).innerText === 'Cancelar') {
         setAnswer('reject');
         return;
      }

      setAnswer(undefined);
      return;
   };

   const handleShowingFlashMessage = ({
      message,
      timer,
      type,
      haveButton,
      FistTextButton,
      SecondTextButton,
   }: handleShowingFlashMessageProps) => {
      setFistButtonText(FistTextButton);
      setSecondButtonText(SecondTextButton);

      setHaveButton(haveButton);
      setType(type);
      setMessageContent(message);
      setShowFlashMessage(true);

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
                  haveButton={haveButton}
                  handleClick={handleClick}
                  message={messageContent}
                  FistButtonText={FistButtonText}
                  SecondButtonText={secondButtonText}
                  type={type}
               />
            ) : undefined,
            answer: answer,
            handleShowingFlashMessage,
         }}
      >
         {children}
      </FlashMessageContext.Provider>
   );
};
