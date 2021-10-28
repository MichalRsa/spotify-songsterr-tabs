/* eslint-disable no-console */
import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: { main: '#0a84ff', light: '#6bb3ff', dark: '#0058cb' },
    secondary: { main: '#1ed760', light: '#6aff90', dark: '#00a431' },
  },
  // props: {
  //   MuiLink: { underline: 'always' },
  // },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#0000000d',
          color: 'black',
        },
      },
    },
    MuiLink: { root: { color: 'black' } },
    MuiTypography: { root: { color: 'black' } },
    MuiButton: { contained: { backgroundColor: '#1ed760' } },
  },
});

export default theme;
