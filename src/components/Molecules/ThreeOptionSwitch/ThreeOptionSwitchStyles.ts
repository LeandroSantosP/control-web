import styled from 'styled-components';

export const MainWrapper = styled('div')``;

export const Wrapper = styled('div')`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 0 10px;
   height: 30px;
   width: 30px;
   font-size: 0%;
   border-radius: 4px;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   gap: 10px;
   cursor: pointer;

   &:hover {
      display: flex;
      justify-content: center;
      transition: ease-in-out 0.2s;
      align-items: center;
      padding: 0 10px;
      font-size: 100%;
      width: auto;

      height: 30px;
      border-radius: 4px;
      color: ${(props) => props.theme.colors.White};
      background-color: ${(props) => props.theme.colors.RaisinBlack};
      gap: 10px;
   }
`;

export const initialIcon = styled('span')``;

type ButtonProps = {
   selected: boolean;
};

export const Button = styled('button')<ButtonProps>`
   border: none;
   background-color: none;
   height: 100%;
   cursor: pointer;
   opacity: ${(props) => (props.selected ? '100%' : '15%')};
`;
