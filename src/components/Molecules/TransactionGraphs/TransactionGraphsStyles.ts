import styled from 'styled-components';

export const WrapperMain = styled('section')`
   display: flex;
   flex-direction: column;
   position: relative;
   height: 100%;
   text-align: center;
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

export const ChartSkeleton = styled('div')`
   height: 100%;
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   height: 100%;
   gap: 1rem;
   border-radius: 0.4rem;
   position: relative;
   background-color: ${(props) => props.theme.colors.Dark};
`;

export const ChartSkeletonH1 = styled('div')`
   font-weight: 600;
   font-size: 2rem;
   z-index: 5;
   flex-direction: column;
   color: ${(props) => props.theme.colors.TimberWhite};
`;
