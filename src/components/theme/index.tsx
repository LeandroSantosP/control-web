import React from 'react';
import { definitions } from './config_theme';
import { ThemeProvider } from 'styled-components';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProviderProps) => {
  return <ThemeProvider theme={definitions}>{children}</ThemeProvider>;
};

export { Theme };
