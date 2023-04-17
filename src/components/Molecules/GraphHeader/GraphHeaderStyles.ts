import { Info } from '@phosphor-icons/react';
import styled from 'styled-components';

export const Wrapper = styled('header')`
   display: flex;
   width: 100%;
   align-items: center;
   border-radius: 0.4rem;
   position: relative;
   min-height: 50px;
   background-color: ${(props) => props.theme.colors.Dark};
`;

export const InfosButton = styled(Info)`
   position: absolute;
   top: 5px;
   right: 5px;
   cursor: pointer;

   &:hover {
      filter: brightness(1.5);
   }
`;
