import {
   DataStorageProps,
   UpdatedData,
} from '../../../pages/CreateProfile/CreateProfile';
import * as S from './UploadAvatarStyled';
import ImageDefault from '../../../img/Default.png';
import { useCallback, useEffect, useRef, useState } from 'react';

export const UploadAvatarForm = ({
   updateData,
   onValidate,
   data,
   haveErro,
}: {
   data: DataStorageProps;
   updateData: UpdatedData;
   haveErro: boolean;
   onValidate: (callback: () => Promise<any> | undefined) => Promise<any>;
}) => {
   const [fileUrl, setFileUrl] = useState('');
   const hiddenFileInput = useRef<HTMLInputElement>(null);

   const SelectImage = useCallback(() => {
      onValidate(async () => {
         if (
            hiddenFileInput.current?.files &&
            hiddenFileInput.current?.files[0] !== undefined
         ) {
            const { size, type } = hiddenFileInput.current.files[0];
            const sizeInMb = (size / (1024 * 1024)).toFixed(2);

            if (!['image/png', 'image/jpeg'].includes(type)) {
               updateData('AllErrors', [
                  {
                     currentStep: 1,
                     haveError: true,
                     message: 'A imagem deve esta no formato png ou jpg!',
                  },
               ]);
               return;
            } else if (Number(sizeInMb) > 0.21) {
               updateData('AllErrors', [
                  {
                     currentStep: 1,
                     haveError: true,
                     message:
                        'Imagem muito grande Tamanho máximo permitido 250kb!',
                  },
               ]);
               return;
            }
            updateData('AllErrors', undefined);
            return;
         }
      });

      if (
         hiddenFileInput.current?.files &&
         hiddenFileInput.current?.files[0] !== undefined
      ) {
         const fileImage = URL.createObjectURL(
            hiddenFileInput.current?.files[0]
         );
         setFileUrl(fileImage);
         updateData('avatar', hiddenFileInput.current?.files[0]);
      }
   }, [onValidate, updateData]);

   useEffect(() => {
      if (data.avatar) {
         const fileImage = URL.createObjectURL(data.avatar);
         setFileUrl(fileImage);
         return;
      }
   }, [data.AllErrors, data.avatar]);

   const handleClick = () => {
      hiddenFileInput.current?.click();
   };

   return (
      <>
         {data.AllErrors?.map((err) => {
            return <p key={err.message}>{err.message}</p>;
         }) || <p>Tudo Certo!</p>}
         <S.WrapperAvatar>
            <S.AvatarUploadButton
               haveErro={haveErro}
               onClick={handleClick}
               type="button"
            >
               Buscar
            </S.AvatarUploadButton>
            <S.AvatarUploadFile
               accept="image/*"
               ref={hiddenFileInput}
               onChange={SelectImage}
               type="file"
            />
            <S.Avatar src={fileUrl || ImageDefault} />
         </S.WrapperAvatar>
      </>
   );
};
