import styled from 'styled-components';
import { setColorDetails } from '../../../pages/CreateProfile/CreateProfileStyles';

export const WrapperAvatar = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   height: 100%;
   width: 100%;
   background-color: ${(props) => props.theme.colors.Dark};

   border-radius: 1rem;
`;

export const AvatarUploadFile = styled('input')`
   display: flex;
   flex: 1;
   display: none;
   position: absolute;
`;

/* haveErro; */

interface AvatarUploadButtonProps {
   haveErro: boolean;
}

export const AvatarUploadButton = styled('button')<AvatarUploadButtonProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 8px;
   position: absolute;
   right: 10px;
   top: 10px;
   border-style: none;
   box-sizing: border-box;
   color: ${(props) => props.theme.colors.TimberWhite};
   cursor: pointer;
   font-size: 16px;
   font-weight: 500;
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
   height: 5rem;
   width: 5rem;
   text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
   transition: all 0.5s;
   user-select: none;
   touch-action: manipulation;

   &:hover {
      box-shadow: ${() => setColorDetails('rgba(80, 63, 205, 0.5) 0 1px 30px')};
      transition-duration: 0.1s;
   }

   @media (min-width: 768px) {
      padding: 0 2.6rem;
   }
`;

export const Avatar = styled('img')`
   display: flex;
   flex: 1;
   max-width: 350px;
   max-height: 350px;
   object-fit: cover;
   border-radius: 50%;
   height: 100%;
   background-color: rgba(142, 142, 142, 0.17);
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
`;

type WrapperError = AvatarUploadButtonProps;

export const WrapperError = styled('div')<WrapperError>`
   max-width: 150px;
   padding: 5px 10px;
   border-radius: 8px;
   box-shadow: ${(props) =>
      props.haveErro
         ? 'rgba(202, 19, 19, 0.802) 0 1px 10px'
         : 'rgba(53, 202, 19, 0.802) 0 1px 10px'};
   background-color: ${(props) => props.theme.colors.White};
   p {
      font-weight: 700;
      color: ${(props) => props.theme.colors.RaisinBlack};
   }
`;
