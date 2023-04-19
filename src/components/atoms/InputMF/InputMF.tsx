import * as S from './InputMFStyles';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
   onChange?: (e: any) => void;
   value?: string;
}

export const InputMF = (props: InputProps) => {
   const { register } = useFormContext();
   return (
      <S.Input
         id={props.name}
         fontSize="10px"
         {...register(props.name, {
            onChange: props.onChange,
            value: props.value,
         })}
         defaultValue={'R$ 00,00'}
         {...props}
      />
   );
};
