import styled from 'styled-components';

const RedColorError = 'rgba(204, 63, 63, 0.5) 0 1px 30px';

export const setColorDetails = (response: string, isOpacity = false) => {
   return (props: any) => {
      if (props.haveErro) {
         if (isOpacity) {
            return 0.5;
         }
         return RedColorError;
      }
      return response;
   };
};

export const Wrapper = styled('div')`
   display: flex;
   flex-direction: column;
   flex: 1;
   align-items: center;
   margin: 0 auto;
   background-color: hsla(0, 0%, 0%, 0.631);
   width: 100%;
   max-width: 800px;
   max-height: 600px;
   border-radius: 1rem;
   color: #111;
`;

export const Header = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-bottom: 0.6rem;
`;

export const Title = styled('h1')`
   font-size: 2rem;
   font-weight: bold;
   font-style: italic;
`;

export const Info = styled('span')`
   font-size: 1rem;
   font-weight: 500;
`;

export const StepsWrapper = styled('section')`
   display: flex;
   justify-content: center;
   align-items: center;
   max-height: 50px;
   border-radius: 10px;
   justify-content: space-evenly;
   width: 60%;
   margin-top: 1rem;
   position: relative;
   z-index: 10;
`;

interface IconWrapperProps {
   IconActive?: boolean;
}
export const IconWrapper = styled('div')<IconWrapperProps>`
   z-index: 10;
   font-size: 3rem;
   svg {
      padding: 5px;
      border-radius: 50%;

      background-color: ${(props) =>
         props.IconActive ? props.theme.colors.TimberWhite : '#111'};
      color: ${(props) =>
         props.IconActive ? '#111' : props.theme.colors.TimberWhite};
   }
`;

export const Line = styled('div')`
   height: 1px;
   width: 80%;
   position: absolute;
   background-color: rgba(61, 148, 145, 0.42);
   border-radius: 50%;
`;

export const FormWrapper = styled('form')`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   width: 100%;
   height: 100%;
   flex: 1;
   margin: 0m 0;
   padding: 20px;
   justify-content: space-evenly;
   color: ${(props) => props.theme.colors.TimberWhite};
`;

export const WrapperButton = styled('div')`
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-content: center;
`;

interface ButtonProps {
   haveErro: boolean;
}

export const Button = styled('button')<ButtonProps>`
   border-radius: 8px;
   border-style: none;
   box-sizing: border-box;
   opacity: ${() => setColorDetails('1', true)};
   color: ${(props) => props.theme.colors.TimberWhite};
   cursor: ${(props) => {
      if (props.haveErro) {
         return 'block';
      }
      return 'pointer';
   }};
   flex-shrink: 0;
   font-size: 16px;
   font-weight: 500;
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
   height: 4rem;
   text-align: center;

   transition: all 0.5s;
   user-select: none;
   touch-action: manipulation;
   box-shadow: ${() => setColorDetails('none')};

   &:hover {
      box-shadow: ${() => setColorDetails('rgba(80, 63, 205, 0.5) 0 1px 30px')};
      transition-duration: 0.1s;
   }

   @media (min-width: 768px) {
      padding: 0 2.6rem;
   }
`;
