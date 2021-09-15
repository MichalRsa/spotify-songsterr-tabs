/* eslint-disable no-console */
/* eslint-disable */
import * as React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Redirect from './screens/Redirect';
import Main from './screens/Main';
import { Button, CssBaseline } from '@material-ui/core';

const App = () => {
  const redirectToAuth = () => {
    const redirectAuth = async () => {
      const { data } = await axios.get('/api/user');
      console.log(data);
    };
    window.location.href = '/api/user';
  };
  const getSongs = async () => {
    const { data } = await axios.get('/api/songs');
    console.log(data);
  };
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        <Route
          path='/'
          exact
          render={() => (
            <>
              <h1>Log in with your Spotify account</h1>
              <Button
                color='primary'
                variant='contained'
                onClick={() => redirectToAuth()}
              >
                Sign in
              </Button>
              <Button
                color='primary'
                variant='outlined'
                onClick={() => getSongs()}
              >
                Show random songs
              </Button>
            </>
          )}
        />
        <Route path='/redirect' component={Redirect} />
        <Route path='/main' component={Main} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
