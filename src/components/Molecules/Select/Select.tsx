import React from 'react';
import { Check } from '@phosphor-icons/react';
import * as Select from '@radix-ui/react-select';
import * as S from './SelectStyles';

import './styles.css';

interface SelectCustom2 {
   setCurrentValue: React.Dispatch<React.SetStateAction<string>> | any;
   currentValue: string | undefined;
   fieldList: Array<{
      value: string;
      Name: string;
   }>;
}

export const SelectCustom = (props: SelectCustom2) => (
   <Select.Root
      onValueChange={props?.setCurrentValue}
      value={props.currentValue}
   >
      <S.SelectTrigger className="SelectTrigger" aria-label="Food">
         <Select.Value placeholder="Selecione um mes" />
         <S.SelectIcon className="SelectIcon">
            <Check />
         </S.SelectIcon>
      </S.SelectTrigger>
      <Select.Portal>
         <S.SelectContent className="SelectContent">
            <Select.ScrollUpButton className="SelectScrollButton">
               <p>Subir</p>
            </Select.ScrollUpButton>
            <S.SelectView className="SelectViewport">
               <Select.Group>
                  {props.fieldList.map((month) => (
                     <S.SelectItem value={month.value} key={month.value}>
                        <Select.ItemText>{month.Name}</Select.ItemText>
                        <S.SelectItemIndicator>
                           <Check />
                        </S.SelectItemIndicator>
                     </S.SelectItem>
                  ))}
               </Select.Group>
            </S.SelectView>
         </S.SelectContent>
      </Select.Portal>
   </Select.Root>
);
