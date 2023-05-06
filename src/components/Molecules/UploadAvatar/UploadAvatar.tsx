import {
   DataStorageProps,
   UpdatedData,
} from '../../../pages/CreateProfile/CreateProfile';
import * as S from './UploadAvatarStyled';
import ImageDefault from '../../../img/Default.png';
import { useCallback, useRef, useState } from 'react';

export const UploadAvatarForm = ({
   updatedDate,
}: {
   data: DataStorageProps;
   updatedDate: UpdatedData;
}) => {
   const [fileUrl, setFileUrl] = useState('');
   const hiddenFileInput = useRef<HTMLInputElement>(null);

   const SelectImage = useCallback(() => {
      if (hiddenFileInput.current?.files) {
         const fileImage = URL.createObjectURL(
            hiddenFileInput.current?.files[0]
         );
         setFileUrl(fileImage);
         updatedDate('avatar', hiddenFileInput.current?.files[0]);
      }
   }, [updatedDate]);

   const handleClick = () => {
      hiddenFileInput.current?.click();
   };

   return (
      <>
         <S.WrapperAvatar>
            <S.AvatarUploadButton onClick={handleClick} type="button">
               Buscar
            </S.AvatarUploadButton>
            <S.AvatarUploadFile
               ref={hiddenFileInput}
               onChange={SelectImage}
               type="file"
            />
            <S.Avatar src={fileUrl || ImageDefault} />
         </S.WrapperAvatar>
      </>
   );
};
