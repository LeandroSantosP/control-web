import styled from 'styled-components';

export const Whapper = styled('div')`
   display: flex;
   flex-direction: column;
   width: 190px;
   height: 200px;
   position: absolute;
   right: 0;
   top: 2.5rem;
   background-color: ${(props) => props.theme.colors.Dark};
   color: black;
   border-radius: 1rem;
   text-align: center;
   border: 1px solid ${(props) => props.theme.colors.PersianRed};
   z-index: 100;
   justify-content: center;
   padding: 10px;

   h1 {
      margin-bottom: 0.5rem;
      color: ${(props) => props.theme.colors.PersianRed};
   }

   p {
      font-weight: 300;
      font-size: 12px;
      line-height: 17px;
      color: #fff;
   }
`;
