import { ThemeOptions, extendTheme } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Nunito Sans',
  },
};

const theme = extendTheme(themeOptions);

export default theme;
