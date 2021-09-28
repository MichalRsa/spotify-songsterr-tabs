import ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StylesProvider, ThemeProvider } from '@material-ui/core';
import App from './App';
import store from './store';
import theme from './styles/theme';

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StylesProvider>
  </Provider>,
  document.getElementById('root')
);
