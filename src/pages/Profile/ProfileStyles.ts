import styled from 'styled-components';

export const Wrapper = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
`;

export const Header = styled('header')`
   display: flex;
   justify-content: center;
   height: 100%;
   max-height: 300px;
   width: 100%;
   border-radius: 10px;
   min-height: 150px;
   background-color: #54179c;
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
   flex-direction: row;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   margin: 1rem 0;
   height: 100%;
   justify-content: center;
   gap: 2rem;
   padding: 0.8rem;
   bottom: 1.9rem;
   border-radius: 0.4rem;

   @media (max-width: 1250px) {
      justify-content: flex-start;
   }
`;

export const ImageBackground = styled('img')`
   align-self: center;
   background: rgb(199, 114, 255);
   background: radial-gradient(
      circle,
      rgba(199, 114, 255, 0.4598214285714286) 0%,
      rgba(148, 187, 233, 0) 59%
   );

   @media (max-width: 1250px) {
      display: none;
   }
`;

interface FormProps {
   able?: boolean;
}

export const Form = styled('form')<FormProps>`
   display: flex;
   flex-direction: column;
   max-width: 100%;
   background-color: ${(props) => props.theme.colors.RaisinBlack};
   margin: 1rem 0;
   justify-content: center;
   align-items: center;
   gap: 1rem;
   padding: 0.8rem;
   border-radius: 0.4rem;
   border: 1px solid #111;
   position: relative;
   flex: 1;

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
   gap: 0.5rem;
   min-width: 100%;
`;

export const Label = styled('label')`
   font-size: 1.5rem;
   color: ${(props) => props.theme.colors.TimberWhite};
   font-weight: bold;
   font-style: italic;
   line-height: 120%;
`;

type ExtractSaveButtonProps<T extends { active: unknown }> = T['active'];

type SaveButtonProps = ExtractSaveButtonProps<{ active: { active: boolean } }>;

export const SaveButton = styled('button')<SaveButtonProps>`
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 20px;
   width: 100%;
   border: 1px solid #fff;
   border-radius: 5px;
   background-color: transparent;
   cursor: ${(props) => (props.active ? 'default' : 'pointer')};
   font-weight: 500;
   min-height: 1.5rem;

   &:hover {
      background-color: ${(props) =>
         !props.active ? props.theme.colors.Dark : 'transparent'};
   }
`;
