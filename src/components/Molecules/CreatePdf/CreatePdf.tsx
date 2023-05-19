import { zodResolver } from '@hookform/resolvers/zod';
import { FilePdf } from '@phosphor-icons/react';
import * as PopOver from '@radix-ui/react-popover';

import { Download, X } from 'lucide-react';

import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreatePdfApiProps } from '../../../api';
import { useTransactionContext } from '../../../shared/contexts';
import { CheckboxCustom } from '../CheckBox/CheckBox';
import { Button } from '../ResetPass/ResetPassStyles';
import * as S from './CreatePdfStyles';

const schemaPdf = z.object({
   start_date: z?.string().optional(),
   end_date: z?.string().optional(),
   BySubscription: z.coerce.boolean(),
   ByExpense: z.coerce.boolean(),
   ByRevenue: z.coerce.boolean(),
});

type PdfType = z.infer<typeof schemaPdf>;

export const CreatePdf = ({
   TargetButtonPopOver,
}: {
   TargetButtonPopOver: ({
      children,
      Icon,
   }: {
      children: ReactNode;
      Icon: ReactNode;
   }) => JSX.Element;
}) => {
   const { CreatePdf } = useTransactionContext();
   const createPdfForm = useForm<PdfType>({
      resolver: zodResolver(schemaPdf),
   });

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = createPdfForm;

   const handleDownload = async (pdfBuffer: any) => {
      const pdfBytes = new Uint8Array(pdfBuffer.data);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'arquivo.pdf';
      link.click();
      URL.revokeObjectURL(url);
   };

   const onSubmit = async (data: PdfType) => {
      let config = {
         subject: 'meu titulo',
         title: 'meu assunto',
         ...(data.start_date !== '' ? { start_date: data.start_date } : {}),
         ...(data.end_date !== '' ? { end_date: data.end_date } : {}),
         options: {
            ...(data.ByExpense ? { ByExpense: data.ByExpense } : {}),
            ...(data.ByRevenue ? { ByRevenue: data.ByRevenue } : {}),
            ...(data.BySubscription
               ? { BySubscription: data.BySubscription }
               : {}),
         },
      } as CreatePdfApiProps;

      const isOptionsEmpty = Object.keys(config.options as any).length === 0;

      if (isOptionsEmpty) {
         const { options, ...rest } = config;

         config = rest;
      }

      const pdfBuffer = await CreatePdf({
         ...config,
      });

      handleDownload(pdfBuffer);
   };

   return (
      <>
         <PopOver.Root>
            <TargetButtonPopOver Icon={<FilePdf />}>PDF</TargetButtonPopOver>
            <PopOver.Portal>
               <S.PopOverContent className="PopoverContent" sideOffset={5}>
                  <FormProvider {...createPdfForm}>
                     <S.Form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                           <S.Label color="red">Start Date</S.Label>
                           <S.Input type="date" {...register('start_date')} />
                           <S.ErrorMessage>
                              {errors.start_date?.message}
                           </S.ErrorMessage>
                        </div>
                        <div>
                           <S.Label>Last Date</S.Label>
                           <S.Input type="date" {...register('end_date')} />
                           <S.ErrorMessage>
                              {errors.end_date?.message}
                           </S.ErrorMessage>
                        </div>

                        <S.CheckBoxWrapper>
                           <CheckboxCustom name="ByRevenue" text="receita" />
                           <S.ErrorMessage>
                              {errors.ByRevenue?.message}
                           </S.ErrorMessage>
                           <CheckboxCustom name="ByExpense" text="despesas" />
                           <S.ErrorMessage>
                              {errors.ByExpense?.message}
                           </S.ErrorMessage>
                           <CheckboxCustom
                              name="BySubscription"
                              text="inscrições"
                           />
                           <S.ErrorMessage>
                              {errors.BySubscription?.message}
                           </S.ErrorMessage>
                        </S.CheckBoxWrapper>
                        <S.PopOverArrow className="PopoverArrow" />
                        <Button>
                           <Download />
                        </Button>
                     </S.Form>
                  </FormProvider>
                  <S.PopOverClose className="PopoverClose" aria-label="Close">
                     <X />
                  </S.PopOverClose>
               </S.PopOverContent>
            </PopOver.Portal>
         </PopOver.Root>
      </>
   );
};
