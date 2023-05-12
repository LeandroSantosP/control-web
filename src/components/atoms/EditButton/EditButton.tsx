import styled from 'styled-components';

interface InputProps {
   active?: boolean;
}

export const EditProfileButton = styled('button')<InputProps>`
   display: flex;
   position: absolute;
   right: 15px;
   top: 15px;

   padding: 3px;
   filter: ${(props) => (props.disabled ? 'brightness(0.5)' : 'brightness(2)')};
   border: 1px solid
      ${(props) => (props.active ? props.theme.colors.TimberWhite : '#111')};

   color: ${(props) => props.theme.colors.TimberWhite};
   background-color: ${(props) =>
      props.active ? 'rgba(255, 255, 255, 0.09)' : 'transparent'};
   border-radius: 5px;
   cursor: pointer;
`;

type EditButtonProps = {
   children?: any;
   active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const EditButton = ({
   active = false,
   children,
   ...props
}: EditButtonProps) => {
   return (
      <EditProfileButton active={active} {...props}>
         {children}
      </EditProfileButton>
   );
};
