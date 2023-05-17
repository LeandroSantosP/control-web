import { useNavigate, useParams } from 'react-router-dom';
import { ResetPass as ResetPassChange } from '../../components/Molecules/ResetPass/ResetPass';
import { useFlashMessageContext } from '../../shared/contexts';

export const ResetPass = () => {
   const { handleShowingFlashMessage } = useFlashMessageContext();
   const { token } = useParams();

   const navigate = useNavigate();

   const changeEmail = () => {
      handleShowingFlashMessage({
         haveButton: false,
         message: 'Senha Atavizada com secesso!',
         timer: 3000,
         type: 'success',
      });

      navigate(`/login`);
   };
   return <ResetPassChange cb={changeEmail} token={token as string} />;
};
