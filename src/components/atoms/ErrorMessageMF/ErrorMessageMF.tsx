import { useFormContext } from 'react-hook-form';

interface ErrorMessageMFProps {
   field: string;
}

function get(obj: Record<any, any>, path: string) {
   const travel = (regexp: RegExp) =>
      String.prototype.split
         .call(path, regexp)
         .filter(Boolean)
         .reduce((res, key) => {
            return res.dataForUpdate[0][key] ? res.dataForUpdate[0][key] : res;
         }, obj);

   const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
   console.log(result);

   return result;
}
export const ErrorMessageMF = ({ field }: ErrorMessageMFProps) => {
   const {
      formState: { errors },
   } = useFormContext();

   const fieldError = get(errors, field);

   console.log(fieldError);

   if (!fieldError) {
      return null;
   }

   return <span>{fieldError.message?.toString()}</span>;
};
