import styled from 'styled-components';

export const Whapper = styled('div')`
   display: flex;
   flex-direction: column;
   width: 150px;
   height: 200px;
   position: absolute;
   right: 0;
   background-color: ${(props) => props.theme.colors.Dark};
   border-radius: 1rem;
   font-size: 0.7rem;
   justify-content: center;
   padding: 20px;
   align-items: center;

   h1 {
      margin-bottom: 0.5rem;
   }

   p {
      font-weight: 2rem;
      color: #fff;
   }
`;
