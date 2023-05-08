import { z } from 'zod';
import { memo } from 'react';
import * as S from './RegisterFormStyles';

import { useCallback, useEffect, useState } from 'react';
import { Input } from '../../atoms/InputCustomTwo/InputCustomTwo';
import { CreateProfileError } from '../../atoms/CreateProfileError/CreateProfileError';

import {
   DataStorageProps,
   UpdatedData,
} from '../../../pages/CreateProfile/CreateProfile';
import { toMoney } from 'vanilla-masker';

const dataSchema = z.object({
   profession: z.string().optional(),
   salary: z.string().optional(),
   phonenumber: z
      .string()
      .refine((value) => {
         if (value === '') {
            return true;
         }
         if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
            return false;
         }

         return true;
      }, "Telefone Precisa seguir o seguinte formato '(00) 00000-0000'")
      .optional(),
   birthday: z.string().refine((value) => {
      if (value === '') {
         return true;
      }
      const dateOfBirth = new Date(value);
      const age = Math.floor(
         (Number(new Date()) - Number(dateOfBirth)) /
            (365.25 * 24 * 60 * 60 * 1000)
      );

      return age >= 16;
   }, 'Deve ser maior de 16 anos'),
});

interface Input {
   data: DataStorageProps;
   updateData: UpdatedData;
   onValidate: (callback: () => Promise<any | undefined>) => void;
}

export interface ErrorMessagesProps {
   mess: string;
   path: (string | number)[];
}

const RegisterForm = ({ data, updateData, onValidate }: Input) => {
   const [errosMessage, setErrosMessage] = useState<ErrorMessagesProps[]>([]);
   const handleValidate = useCallback(async () => {
      setErrosMessage([]);
      try {
         const { avatar, ...props } = data;
         const validData = dataSchema.parse(props);

         return Promise.resolve(validData);
      } catch (error) {
         if (error instanceof z.ZodError) {
            const errosMessage = [] as any[];
            error.issues.forEach((issue) => {
               errosMessage.push({ mess: issue.message, path: issue.path });
               return;
            });

            setErrosMessage(errosMessage);
            return {
               haveError: true,
            };
         }
         return error;
      }
   }, [data]);

   useEffect(() => {
      if (errosMessage.length > 0) {
         updateData('AllErrors', [
            { currentStep: 0, haveError: true, message: 'haveErro' },
         ]);
         return;
      } else {
         updateData('AllErrors', undefined);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [errosMessage.length]);

   useEffect(() => {
      if (onValidate) {
         onValidate(handleValidate);
      }
   }, [handleValidate, onValidate]);

   return (
      <>
         <S.InputWrapper>
            <S.InputLabel>Profissão</S.InputLabel>
            <Input
               name="profession"
               onChange={({ target }) => updateData('profession', target.value)}
               value={data.profession ?? ''}
               placeholder="Desenvolvedor Back-end"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
            <CreateProfileError errosMessage={errosMessage} type="profession" />
         </S.InputWrapper>
         <S.InputWrapper>
            <S.InputLabel>Salario</S.InputLabel>
            <Input
               name="salary"
               type="string"
               onChange={({ target }) => {
                  const money = toMoney(target.value, {
                     unit: 'R$',
                  }) as string;

                  updateData('salary', money);
               }}
               value={data.salary ?? ''}
               placeholder="R$ 2000"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
            <CreateProfileError errosMessage={errosMessage} type="salary" />
         </S.InputWrapper>
         <S.InputWrapper>
            <S.InputLabel>Telefone</S.InputLabel>
            <Input
               name="phonenumber"
               onChange={({ target }) =>
                  updateData('phonenumber', target.value)
               }
               value={data.phonenumber ?? ''}
               placeholder="(11) 99999-9999"
               type="string"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
            <CreateProfileError
               errosMessage={errosMessage}
               type="phonenumber"
            />
         </S.InputWrapper>
         <S.InputWrapper>
            <S.InputLabel>Data de aniversario</S.InputLabel>
            <Input
               onChange={({ target }) => updateData('birthday', target.value)}
               value={data.birthday?.toString() ?? ''}
               name="birthday"
               placeholder="21/05/2003"
               type="date"
               bg="rgba(243, 243, 243, 0.21)"
               cl="#c4c4c4f8"
               pc="#111"
               bx="2px -1px 9px 0px rgba(0, 0, 0, 0.149)"
            />
            <CreateProfileError errosMessage={errosMessage} type="birthday" />
         </S.InputWrapper>
      </>
   );
};

export default memo(RegisterForm);
