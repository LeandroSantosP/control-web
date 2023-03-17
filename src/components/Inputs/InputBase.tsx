import * as S from './StylesInput';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fontSize: 'small' | 'medium' | 'large';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

export const Input = ({ fontSize, register, ...props }: InputProps) => {
  return <S.Input fontSize={fontSize} {...register} {...props}></S.Input>;
};
