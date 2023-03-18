import { Input } from './InputBase';
import { Label } from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   setting: any;
   fontSize?: 'small' | 'medium' | 'large';
   LabelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const InputAndLabel = ({
   fontSize = 'medium',
   LabelProps,
   setting,
   label,
   ...props
}: InputProps) => {
   return (
      <>
         <Label {...LabelProps}>{label}</Label>
         <Input fontSize={fontSize} register={setting} {...props} />
      </>
   );
};
