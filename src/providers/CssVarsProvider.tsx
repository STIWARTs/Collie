'use client';

import { ReactNode } from 'react';
import theme from 'utils/theme';
import {
  CssBaseline,
  Experimental_CssVarsProvider as ThemeProvider,
} from '@mui/material';

interface CssVarsProviderProps {
  children: ReactNode;
}

function CssVarsProvider({ children }: CssVarsProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default CssVarsProvider;
