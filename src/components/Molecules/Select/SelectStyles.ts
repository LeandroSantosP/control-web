import styled from 'styled-components';
import * as Select from '@radix-ui/react-select';

export const SelectIcon = styled(Select.Icon)`
   color: ${(props) => props.theme.colors.White};
`;

export const SelectTrigger = styled(Select.Trigger)`
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${(props) => props.theme.colors.White};
   padding: 0 15px;
   height: 30px;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   outline: none;
   font-size: 12px;
   cursor: pointer;
   border-radius: 4px;
   gap: 0.5rem;
   transition: 0.3s ease-in-out;
`;

export const SelectContent = styled(Select.Content)`
   background-color: #000;

   border: 1px solid ${(props) => props.theme.colors.RaisinBlack};
`;

export const SelectItem = styled(Select.Item)`
   font-size: 13px;
   line-height: 1;
   border-radius: 3px;
   display: flex;
   align-items: center;
   height: 25px;
   padding: 0 35px 0 25px;
   color: ${(props) => props.theme.colors.Linen};
   position: relative;
   cursor: pointer;
`;

export const SelectView = styled(Select.Viewport)`
   padding: 5px;
`;

export const SelectItemIndicator = styled(Select.ItemIndicator)`
   position: absolute;
   left: 0;
   width: 25px;
   display: inline-flex;
   align-items: center;
   justify-content: center;
`;
