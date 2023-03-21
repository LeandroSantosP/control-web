const BaseColors = {
   RaisinBlack: '#0a0a0a',
   Vanila: '#F3DFA2',
   Linen: '#EFE6DD',
   White: '#fff',
   Dark: '#111',
   TimberWhite: '#D6D6D6',
};

const BrandColor = {
   PersianRed: '#BB4430',
   Verdigris: '#7EBDC2',
};

export const colors = {
   ...BaseColors,
   ...BrandColor,
};

const fontSize = {
   small: '1rem',
   medium: '1.6rem',
   large: '2.2rem',
   extraSmall: '0.6rem',
};
const space = [4, 8, 12, 16, 20, 24, 28, 32];

export const definitions = {
   colors,
   fontSize,
   space,
};
