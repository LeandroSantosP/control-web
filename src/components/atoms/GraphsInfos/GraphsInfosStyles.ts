import styled from 'styled-components';

export const Whapper = styled('div')`
   display: flex;
   flex-direction: column;
   width: 150px;
   height: 200px;
   position: absolute;
   right: 0;
   top: 1.9rem;
   background-color: ${(props) => props.theme.colors.Dark};
   color: black;
   border-radius: 1rem;
   z-index: 100;
   padding: 10px;
   align-items: center;
   justify-content: center;

   h1 {
      margin-bottom: 0.5rem;
      color: ${(props) => props.theme.colors.PersianRed};
   }

   p {
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: #fff;
   }
`;
