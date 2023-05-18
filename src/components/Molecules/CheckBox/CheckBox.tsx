import { useFormContext } from 'react-hook-form';
import * as S from './CheckBoxStyles';

interface CheckboxCustomProps {
   text: string;
   name: string;
   defaultChecked?: boolean;
}

export const CheckboxCustom = ({
   text,
   name,
   defaultChecked = false,
}: CheckboxCustomProps) => {
   const { register } = useFormContext();
   return (
      <div
         style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            width: '45px',
            flexDirection: 'column',
         }}
      >
         <S.CheckboxRoot
            type="checkbox"
            defaultChecked={defaultChecked}
            {...register(name)}
         />
         <label>{text}</label>
      </div>
   );
};
