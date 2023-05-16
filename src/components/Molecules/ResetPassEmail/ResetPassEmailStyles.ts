import styled from 'styled-components';

export const Wrapper = styled('main')`
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   height: 100vh;
   gap: 1rem;
`;

export const SubWrapper = styled('div')`
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
`;

export const Button = styled('button')`
   width: 100%;
   height: 1.7rem;
   border: none;
   text-align: center;
   background-color: #fff;
   color: #111;
   font-size: 1rem;
   font-weight: bold;
   cursor: pointer;
`;

export const FormWrapper = styled('form')`
   display: flex;
   flex-direction: column;
   background-color: black;
   padding: 10px;
   gap: 0.2rem;
   border-radius: 10px;
`;
export const ErrorMessage = styled('p')`
   color: ${(props) => props.theme.colors.PersianRed};
   font-weight: bold;
`;
