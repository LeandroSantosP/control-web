import styled from 'styled-components';
import * as Select from '@radix-ui/react-select';

export const Title = styled('h1')`
   display: flex;
   align-items: center;
   gap: 0.5rem;
   flex: 1;
`;

export const Recurrence = styled('select')`
   flex: 2;
   margin-right: 5rem;
`;

export const UserImage = styled('div')`
   display: flex;
   position: absolute;
   width: 55px;
   height: 55px;
   border-radius: 1rem;
   border: 1px solid ${(props) => props.theme.colors.Vanila};
   justify-content: center;
   align-items: center;
   right: 1.1rem;
   overflow: hidden;
   cursor: pointer;
   transition: all 0.2s;

   img {
      object-fit: cover;
      width: 100%;
   }

   &:hover {
      transform: scale(1.3);
   }
`;

export const SelectPortal = styled(Select.Portal)`
   width: 60px;
   height: 20px;
`;

export const SelectContent = styled(Select.Content)`
   width: 60px;
   height: 20px;
   background-color: red;
`;
