/* eslint-disable no-console */
/* eslint-disable */
import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import AuthRedirect from './screens/Redirect';
import Main from './screens/Main/Main';
import { Button, CssBaseline } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App = () => {
  const user = useSelector((store: RootState) => store.spotifyAuth?.userData);

  const history = useHistory();
  useEffect(() => {
    console.log('app useeffect running!', user);
  }, [user]);
  const redirectToAuth = () => {
    // const redirectAuth = async () => {
    //   const { data } = await axios.get('/api/user');
    //   console.log(data);
    // };

    // redirectAuth();
    window.location.href = '/api/user';
  };
  const getSongs = async () => {
    const { data } = await axios.get('/api/songs/random');
    console.log(data);
  };
  return (
    <BrowserRouter>
      <CssBaseline />
      {user ? (
        <Switch>
          <Route path='/main' component={Main} />
          <Redirect from='/redirect' to='/main' />
        </Switch>
      ) : (
        <Switch>
          <Route path='/redirect' component={AuthRedirect} />
          <Route>
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
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
