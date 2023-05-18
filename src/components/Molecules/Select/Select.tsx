import { Check } from '@phosphor-icons/react';
import * as Select from '@radix-ui/react-select';
import React from 'react';
import * as S from './SelectStyles';

import './styles.css';

interface SelectCustom2 {
   setCurrentValue: React.Dispatch<React.SetStateAction<string>> | any;
   disable?: boolean;
   currentValue: string | undefined;
   fieldList: Array<{
      value: string;
      Name: string;
   }>;
   haveDefaultValue?: boolean;
}

export const SelectCustom = (props: SelectCustom2) => (
   <Select.Root
      disabled={props.disable || false}
      onValueChange={props?.setCurrentValue}
      value={props.currentValue}
   >
      <S.SelectTrigger>
         <Select.Value placeholder="Selecione um mes" />
         <S.SelectIcon>
            <Check />
         </S.SelectIcon>
      </S.SelectTrigger>
      <Select.Portal>
         <S.SelectContent>
            <Select.ScrollUpButton className="SelectScrollButton">
               <p>Subir</p>
            </Select.ScrollUpButton>
            <S.SelectView>
               <Select.Group>
                  {props.haveDefaultValue && (
                     <S.SelectItem value={'all'} key={'2ss'}>
                        <Select.ItemText>Todas as transações</Select.ItemText>
                        <S.SelectItemIndicator>
                           <Check />
                        </S.SelectItemIndicator>
                     </S.SelectItem>
                  )}
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
