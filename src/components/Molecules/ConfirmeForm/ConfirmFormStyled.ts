import styled from 'styled-components';

export const Wrapper = styled('section')`
   display: flex;
   flex-direction: row;
   flex: 1;
   gap: 1rem;
   position: relative;
   align-items: flex-start;
`;

export const InfoWrapper = styled('section')`
   display: flex;
   flex-direction: column;
   flex: 1;
   width: 100%;
   height: 100%;
`;

export const Info = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   flex: 1;
`;

export const Title = styled('h2')`
   font-size: 1rem;
   font-weight: 700;
`;

export const Description = styled('p')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-family: 'Courier New', Courier, monospace;
   border-bottom: 1px solid #fff;
   border-radius: 0.2rem;
   font-size: 2rem;
`;

export const Img = styled('img')`
   width: 300px;
   height: 300px;
   border-radius: 50%;
   align-self: center;
   object-fit: cover;
`;
