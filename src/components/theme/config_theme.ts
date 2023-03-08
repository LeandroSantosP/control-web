const BaseColors = {
  RaisinBlack: '#231F20',
  Vanila: '#F3DFA2',
  Linen: '#EFE6DD',
  White: '#fff',
  Dark: '#111',
};

const BrandColor = {
  PersianRed: '#BB4430',
  Verdigris: '#7EBDC2',
};

export const colors = {
  ...BaseColors,
  ...BrandColor,
};

// const fontSize = {
//   small: '1rem',
//   medium: '1.50rem',
//   large: '2rem',
// };

const fontSize = [10, 12, 14, 16, 18, 20];
const space = [4, 8, 12, 16, 20, 24, 28, 32];

export const definitions = {
  colors,
  fontSize,
  space,
};
