import { FileImage } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import styled from 'styled-components';

export const ProfilePic = styled('img')`
   height: 90px;
   width: 90px;
   border-radius: 50%;
   object-fit: cover;
`;

export const ButtonFile = styled('button')`
   display: flex;
   align-items: center;
   width: 30px;
   height: 30px;
   justify-content: center;
   border: 2px solid #fff;
   border-radius: 0.4rem;
   cursor: pointer;
   &:hover {
      filter: brightness(2.5);
      background-color: #fff;
      color: black;
   }
`;

const ImageLogo = styled(FileImage)`
   font-size: 1.2rem;
   font-weight: 900;
   border-radius: 0.4rem;
`;

export const UpdatedProfilePic = ({
   userAvatar,
   handleSubmitPic,
}: {
   userAvatar: string | undefined;
   handleSubmitPic(callback: () => File | undefined): Promise<string>;
}) => {
   const [erros, setErros] = useState<{ [key: string]: any } | null>(null);
   const fileRef = useRef<HTMLInputElement>(null);

   const OnSeleteImage = () => {
      if (fileRef.current?.files && fileRef.current?.files[0] !== undefined) {
         const { size, type } = fileRef.current.files[0];
         const sizeInMb = (size / (1024 * 1024)).toFixed(2);

         if (!['image/png', 'image/jpeg'].includes(type)) {
            setErros((prev) => ({
               ...prev,
               error: {
                  ...prev?.erros,
                  pgn: {
                     message: 'Formato inválido, must be png or jpeg!.',
                  },
               },
            }));
            return;
         } else if (Number(sizeInMb) > 0.21) {
            setErros((prev) => ({
               ...prev,
               error: {
                  ...prev?.erros,
                  size: {
                     message: 'Image is too large must be less than 250kb.',
                  },
               },
            }));
            return;
         }
      }

      const callback = () => {
         if (fileRef.current?.files) return fileRef.current?.files[0];
      };
      handleSubmitPic(callback);
   };

   const handleClick = () => {
      fileRef.current?.click();
   };

   return (
      <>
         {userAvatar && (
            <ProfilePic src={userAvatar} alt="Image do perfil do usuário." />
         )}
         {erros && <p style={{ color: 'red' }}>{erros?.error?.pgn?.message}</p>}
         {erros && (
            <p style={{ color: 'red' }}>{erros?.error?.size?.message}</p>
         )}
         <ButtonFile onClick={handleClick}>
            <ImageLogo />
         </ButtonFile>
         <input
            accept="image/*"
            onChange={OnSeleteImage}
            style={{ display: 'none' }}
            type="file"
            ref={fileRef}
         />
      </>
   );
};
