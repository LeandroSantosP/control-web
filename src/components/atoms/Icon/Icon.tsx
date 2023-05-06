import { IconProps } from '@phosphor-icons/react';

interface CustomIconProps {
   Icon: any;
   props?: IconProps;
}

const CustomIcon = ({ Icon, props }: CustomIconProps) => {
   return <Icon {...props} />;
};

export { CustomIcon };
