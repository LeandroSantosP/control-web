import styled from 'styled-components';

interface IconsProps {
   currentIcon: JSX.Element;
}

export const Icon = ({ currentIcon }: IconsProps): any => {
   return currentIcon;
};

export const CustomIcon = styled(Icon)`
   color: red;
`;
