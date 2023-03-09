import * as S from './StylesInput';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fontSize: 'small' | 'medium' | 'large';
  register: any;
}

export const Input = ({ fontSize, register, ...props }: InputProps) => {
  return <S.Input fontSize={fontSize} {...register} {...props}></S.Input>;
};
