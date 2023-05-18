export const categoryList = [
   { value: 'food', Name: 'Comida' },
   { value: 'transport', Name: 'Transporte' },
   { value: 'education', Name: 'Educação' },
   { value: 'habitation', Name: 'Habitação' },
   { value: 'health', Name: 'Saudê' },
   { value: 'leisure', Name: 'Lazer' },
   { value: 'products', Name: 'Produtos' },
   { value: 'Taxes', Name: 'Taxas' },
   { value: 'Investments', Name: 'Investimento' },
   { value: 'debts', Name: 'Débitos' },
   { value: 'unknown', Name: 'Desconhecida' },
];

export const monthlyList = [
   { value: 'Despesa', Name: 'Despesa' },
   { value: 'Receita', Name: 'Receita' },
];

export const recurrencyList = [
   { value: 'null', Name: 'Sem recorrência' },
   { value: 'monthly', Name: 'Mensal' },
   { value: 'yearly', Name: 'Anual' },
   { value: 'daily', Name: 'Diária' },
];

type categoryMappingType = {
   [key: string]: string;
};

export const categoryMapping: categoryMappingType = {
   transport: 'Transporte',
   food: 'Comida',
   habitation: 'Habitação',
   health: 'Saúde',
   education: 'Educação',
   leisure: 'Lazer',
   products: 'Produtos',
   debts: 'Débitos',
   Taxes: 'Taxas',
   Investments: 'Investimentos',
};
