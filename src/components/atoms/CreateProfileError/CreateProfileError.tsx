import { ErrorMessagesProps } from '../../Molecules/RegisterForm/RegisterForm';

interface CreateProfileErrorProps {
   errosMessage: ErrorMessagesProps[];
   type: string | number;
}

export const CreateProfileError = ({
   errosMessage,
   type,
}: CreateProfileErrorProps) => {
   return (
      <>
         {errosMessage.map((err, index) => {
            const currentErro = err.path.find((err) => err === type);

            if (currentErro) {
               return <p key={index}>{err.mess}</p>;
            }
         })}
      </>
   );
};
