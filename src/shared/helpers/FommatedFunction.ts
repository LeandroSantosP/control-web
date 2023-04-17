export const FormatCurense = (amount: number) =>
   new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
   }).format(amount);
