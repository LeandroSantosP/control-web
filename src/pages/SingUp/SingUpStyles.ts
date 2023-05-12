import styled from 'styled-components';

export const Wrapper = styled.main`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
`;

interface BoxProps {
   JustifyContent?: string;
}

export const Box = styled.div<BoxProps>`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: ${(props) => props.JustifyContent || 'center'};
   flex: 1;
`;

export const NotHaveAccount = styled.p`
   text-decoration: underline;
   font-size: ${(props) => props.theme.fontSize.small};
   cursor: pointer;
   transition: all 0.2s;

   &:hover {
      color: ${(props) => props.theme.colors.Vanila};
   }
`;

export const Form = styled.form`
   display: flex;

   background-color: ${(props) => props.theme.colors.Dark};
   flex-direction: column;
`;
export const ErrorMessage = styled('p')`
   color: ${(props) => props.theme.colors.PersianRed};
   margin-top: 10px;
   font-weight: bold;
`;
