import styled from 'styled-components';

interface InputStylesProps {
   fontSize: 'small' | 'medium' | 'large';
   background_color_custom?: string;
   margin_bottom?: string;
   padding_top_and_button?: string;
}

export const Input = styled.input<InputStylesProps>`
   background-color: ${(props) =>
      props.background_color_custom || 'transparent'};
   height: 45px;
   width: 100%;
   border-radius: 200px;
   color: #fff;
   border: 1px solid #fff;
   font-size: ${(props) => props.theme.fontSize[props.fontSize]};
   padding: 12px 18px;
   margin-bottom: ${(props) => props.margin_bottom || '0px'};
   padding: ${(props) => props.padding_top_and_button || '1rem'} 18px;

   outline: none;

   &::placeholder {
      color: #cccccc9c;
   }
`;
