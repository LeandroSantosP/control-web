import { Box } from '../../atoms/Box/Box';
import { Input } from '../../atoms/Input/InputBase';
import { Label } from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   label: string;
   setting?: any;
   fontSize?: 'small' | 'medium' | 'large';
   marginTopAndBottom: string;
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
         <Box flexDirection="column" alignItems="flex-start">
            <Label {...LabelProps}>{label}</Label>
            <Input fontSize={fontSize} register={setting} {...props} />
         </Box>
      </>
   );
};
