/* eslint-disable no-console */
import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button, CssBaseline } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AuthRedirect from './screens/Redirect';
import Main from './screens/Main/Main';
import { RootState } from './store';
import AlbumsScreen from './screens/AlbumsScreen';
import ArtistsScreen from './screens/ArtistsScreen';

const App = () => {
  const user = useSelector((store: RootState) => store.spotifyAuth?.user);

  useEffect(() => {
    console.log('app useeffect running!', user);
  }, [user]);
  const redirectToAuth = () => {
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
          <Route path='/albums/:id' component={AlbumsScreen} />
          <Route path='/artists/:id' component={ArtistsScreen} />
          <Redirect from='/redirect' to='/main' />
          <Redirect from='/' to='/main' />
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
