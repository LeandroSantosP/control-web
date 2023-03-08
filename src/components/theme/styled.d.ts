import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      Dark: string;
      Linen: string;
      PersianRed: string;
      RaisinBlack: string;
      Vanila: string;
      Verdigris: string;
      White: string;
    };
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
    space: number[];
  }
}
