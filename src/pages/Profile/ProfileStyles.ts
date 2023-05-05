import styled from 'styled-components';

export const Wrapper = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
   background-color: red;
`;

export const Header = styled('header')`
   display: flex;
   justify-content: center;
   height: 100%;
   max-height: 300px;
   width: 100%;
   border-radius: 10px;
   min-height: 150px;
   background-color: blue;
`;

export const WrapperSection = styled('section')`
   display: flex;
   align-self: flex-end;
   width: 100%;
   height: 100px;
   gap: 2rem;

   padding: 60px 20px;
   align-items: center;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
`;

export const ProfilePic = styled('img')`
   height: 90px;
   width: 90px;
   border-radius: 50%;
`;

export const ProfileName = styled('h1')`
   font-size: 1.4rem;
   color: white;
   font-weight: bold;
   margin: 0;
   padding: 0;
`;

/* Form */

export const FormWrapper = styled('section')`
   display: flex;
   flex-direction: column;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   margin: 1rem 0;
   height: 100%;
   justify-content: center;
   gap: 1rem;
   padding: 0.8rem;
   bottom: 1.9rem;
   border-radius: 0.4rem;
`;

interface FormProps {
   able?: boolean;
}

export const Form = styled('form')<FormProps>`
   display: flex;
   flex-direction: column;
   max-width: 640px;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   margin: 1rem 0;
   justify-content: center;
   align-items: center;
   gap: 1rem;
   padding: 0.8rem;
   border-radius: 0.4rem;
   border: 1px solid #111;
   position: relative;

   &:hover {
      filter: ${(props) => (props.able ? 'brightness(1.1)' : 'none')};
      border: 1px solid #111;
   }
`;

export const InputWrapper = styled('section')`
   display: flex;
   align-self: flex-start;
   flex-direction: column;
   justify-content: center;
   gap: 1rem;
   min-width: 600px;
`;

export const Label = styled('label')`
   font-size: 1.5rem;
   color: ${(props) => props.theme.colors.TimberWhite};
   font-weight: bold;
   font-style: italic;
   line-height: 120%;
`;

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
