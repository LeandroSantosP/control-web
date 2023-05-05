import styled from 'styled-components';

export const WrapperAvatar = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   height: 100%;
   width: 100%;
`;

export const AvatarUploadFile = styled('input')`
   display: flex;
   flex: 1;
   display: none;
   position: absolute;
`;

export const AvatarUploadButton = styled('button')`
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 8px;
   position: absolute;
   right: 0;
   top: 0;
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
      box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
      transition-duration: 0.1s;
      opacity: 1;
   }

   @media (min-width: 768px) {
      padding: 0 2.6rem;
   }
`;

export const Avatar = styled('img')`
   display: flex;
   flex: 1;
   max-width: 400px;
   max-height: 400px;
   border-radius: 50%;
   height: 100%;
   background-color: rgba(142, 142, 142, 0.17);
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
`;
