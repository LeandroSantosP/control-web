import React from 'react';
import { Check } from '@phosphor-icons/react';
import * as Select from '@radix-ui/react-select';
import * as S from './SelectStyles';

import './styles.css';

const SelectDemo = () => (
   <Select.Root onValueChange={(e) => console.log(e)}>
      <S.SelectTrigger className="SelectTrigger" aria-label="Food">
         <Select.Value placeholder="Selecione um mes" />
         <S.SelectIcon className="SelectIcon">
            <Check />
         </S.SelectIcon>
      </S.SelectTrigger>
      <Select.Portal>
         <S.SelectContent className="SelectContent">
            {/* <Select.ScrollUpButton className="SelectScrollButton">
               <p>Subir</p>
            </Select.ScrollUpButton> */}
            <S.SelectView className="SelectViewport">
               <Select.Group>
                  <S.SelectItem value="01">
                     <Select.ItemText>Janeiro</Select.ItemText>
                     <S.SelectItemIndicator>
                        <Check />
                     </S.SelectItemIndicator>
                  </S.SelectItem>

                  <S.SelectItem value="02">
                     <Select.ItemText>Marco</Select.ItemText>
                     <S.SelectItemIndicator>
                        <Check />
                     </S.SelectItemIndicator>
                  </S.SelectItem>
               </Select.Group>
            </S.SelectView>
         </S.SelectContent>
      </Select.Portal>
   </Select.Root>
);

export default SelectDemo;
