import { Check } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ResetPassEmail } from '../../components/Molecules/ResetPassEmail/ResetPassEmail';
import { Button } from '../CreateProfile/CreateProfileStyles';

const Wrapper = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   height: 100%;
`;

const Card = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: center;
   height: 400px;
   width: 500px;
   justify-content: center;
   align-content: center;
   gap: 2rem;
   background-color: black;
   border-radius: 10px;

   p {
      font-size: 1.5rem;
   }
`;

export const ResetPassSendEmail = () => {
   const navigate = useNavigate();
   const [showFinalMessage, setShowFinalMessage] = useState(false);

   const changeEmail = (data: boolean) => {
      if (data === true) {
         setShowFinalMessage(() => true);
         console.log(showFinalMessage);
         return;
      } else {
         setShowFinalMessage(false);
      }
   };

   return (
      <>
         <>{!showFinalMessage && <ResetPassEmail cb={changeEmail} />}</>
         <>
            {showFinalMessage && (
               <Wrapper>
                  <Card>
                     <Check
                        size={40}
                        style={{
                           color: '#fff',
                           backgroundColor: 'green',
                           height: '100px',
                           padding: '10px',
                           width: '100px',
                           borderRadius: '50%',
                        }}
                     />
                     <p>Email Enviado com sucesso!</p>
                     <Button
                        haveErro={false}
                        onClick={() => navigate('/login')}
                     >
                        Logar
                     </Button>
                  </Card>
               </Wrapper>
            )}
         </>
      </>
   );
};
