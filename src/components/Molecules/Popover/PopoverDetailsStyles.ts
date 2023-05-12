import styled from 'styled-components';

interface PopOver {
   top: number;
   left: number;
}

export const PopOver = styled('div')<PopOver>`
   display: flex;
   background-color: '#111';
   flex-direction: row;
   padding: 0.2rem;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   border-radius: 0.8rem;
   border: 1px solid rgba(160, 160, 160, 0.46);
   position: absolute;

   cursor: help;
   z-index: 15;

   top: ${(props) => {
      const elementTop = props.top;
      const scrollTop = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const elementBottom = elementTop + 290;

      if (elementTop < scrollTop) {
         return `${elementTop - 200}`;
      } else if (elementBottom > scrollTop + viewportHeight) {
         return `${elementTop - 290}`;
      } else {
         return `${elementTop}`;
      }
   }}px;

   left: ${(props) => props.left - 195}px;
   transform-origin: right;
   animation: popover 0.2s forwards;
`;

interface SubDetailsWrapperProps {
   padding?: string;
}

export const SubDetailsWrapper = styled('div')<SubDetailsWrapperProps>`
   display: flex;
   flex-direction: column;
   max-height: 240px;
   align-items: center;
   padding: ${(props) => props.padding || '1.5rem'};
   background-color: ${(props) => props.theme.colors.Dark};
   justify-content: center;
   overflow: scroll;
   overflow-x: hidden;
   font-size: 0.8rem;
   &:first-child {
      border-right: 1px solid ${(props) => props.theme.colors.TimberWhite};
   }
`;

export const FinishedButton = styled('button')`
   padding: 8px 5px;
   cursor: pointer;
   border: none;
   border-radius: 0.3rem;
   top: 0.5rem;
   font-size: 0.6rem;
   background-color: #ffaa22;
   margin-left: 8px;
   color: ${(props) => props.theme.colors.RaisinBlack};
   &:hover {
      filter: brightness(1.2);
   }
`;

export const Info = styled('p')`
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   padding: 10px;
   width: 100%;
   border-radius: 10px;
   text-align: center;
   margin: 3px;

   font-size: 0.7rem;
`;

export const Type = styled('span')`
   color: ${(props) => props.theme.colors.TimberWhite};
`;

export const SubContent = styled('div')`
   display: flex;
   flex-direction: column;
   text-align: flex-start;
`;

export const DescriptionWrapper = styled('div')`
   display: flex;
   width: 200px;
   flex: 1;
   text-align: start;
   border-radius: 0.4rem;
   font-size: 1rem;
   padding: 10px;
   margin: 1rem;
   color: ${(props) => props.theme.colors.TimberWhite};
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   white-space: none;
`;
