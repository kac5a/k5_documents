import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { colors } from '../AppConfig';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: red.A400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1280,
      lg: 1600,
      xl: 1920,
    },
  },
});

export default theme;