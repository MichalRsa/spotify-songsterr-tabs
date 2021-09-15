import ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import App from './App';
import store from './store';
import theme from './styles/theme';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
