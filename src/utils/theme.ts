import { ThemeOptions, createTheme } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Nunito Sans',
  },
};

const theme = createTheme(themeOptions);

export default theme;
