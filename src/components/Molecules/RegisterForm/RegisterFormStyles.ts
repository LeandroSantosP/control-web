import styled from 'styled-components';

export const FormWrapper = styled('form')`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   width: 80%;
   height: 100%;
   flex: 1;
   margin: 0m 0;
   padding: 20px;
   justify-content: space-evenly;
   color: ${(props) => props.theme.colors.TimberWhite};
`;

export const InputWrapper = styled('div')`
   display: flex;
   width: 100%;
   flex-direction: column;
   gap: 10px;
`;

export const InputLabel = styled('label')`
   font-size: 1rem;
   font-weight: bold;
`;
