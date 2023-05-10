import { z } from 'zod';

export const dataSchema = z.object({
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
