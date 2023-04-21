import styled from 'styled-components';
import Chart from 'react-apexcharts';

export const WrapperMain = styled('section')`
   display: flex;
   flex-direction: column;
   position: relative;
   height: 80%;
   text-align: center;
`;

interface ToggleButtonProps {
   top?: number;
   right?: number;
   left?: number;
}

export const ToggleButton = styled('button')<ToggleButtonProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   background-color: ${(props) => props.theme.colors.Dark};
   border: 1px solid ${(props) => props.theme.colors.TimberWhite};
   padding: 0.2rem;
   top: ${(props) => props.top ?? undefined};
   right: ${(props) => props.right ?? undefined};
   left: ${(props) => props.left ?? undefined};
   border-radius: 0.3rem;
   cursor: pointer;
   &:hover {
      filter: brightness(1.9);
   }
`;

interface ChartTittle {
   type: string;
}

export const ChartTittle = styled('h1')<ChartTittle>`
   font-size: 1rem;
   font-weight: 500;
   margin: 0.5rem 0;

   span:nth-child(1) {
      color: ${(props) => {
         return props.type !== 'expense'
            ? 'rgba(80, 176, 149, 0.66)'
            : props.theme.colors.TimberWhite;
      }};
   }

   span:nth-child(2) {
      color: ${(props) => {
         return props.type !== 'revenue'
            ? 'rgba(176, 159, 80, 0.66)'
            : props.theme.colors.TimberWhite;
      }};
   }
`;

export const ChartCustoms = styled(Chart)`
   display: flex;
   width: 100%;
   max-width: 650px;
   margin: 35px auto;
`;
