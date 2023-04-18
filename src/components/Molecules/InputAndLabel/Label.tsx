import styled from 'styled-components';

interface LabelProps {
   color?: string;
   margin?: string;
   fontSize?: 'medium' | 'small' | 'large';
   fontWeight?: string;
}

export const Label = styled.label<LabelProps>`
   margin: ${(props) => props.margin || '0.6rem 0'};
   font-size: ${(props) => props.theme.fontSize[props.fontSize || 'medium']};
   color: ${(props) => props.color || '#fff'};
   font-weight: ${(props) => props.fontWeight};
`;
