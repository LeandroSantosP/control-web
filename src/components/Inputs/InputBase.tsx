import * as S from './StylesInput.tsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   fontSize: 'small' | 'medium' | 'large';
   background_color_custom?: string;
   margin_bottom?: string;
   padding_top_and_button?: string;
   BRLInput?: boolean;
   filed?: any;
   register?: any;
}

export const Input = ({
   fontSize,
   register,
   background_color_custom,
   padding_top_and_button,
   margin_bottom,
   ...props
}: InputProps) => {
   return (
      <S.Input
         fontSize={fontSize}
         margin_bottom={margin_bottom}
         padding_top_and_button={padding_top_and_button}
         background_color_custom={background_color_custom}
         {...props}
         {...register}
      />
   );
};
