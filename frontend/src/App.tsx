/* eslint-disable no-console */
/* eslint-disable */
import * as React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Redirect from './screens/Redirect';
import Main from './screens/Main';

const App = () => {
  const redirectToAuth = () => {
    const redirectAuth = async () => {
      const { data } = await axios.get('/api');
      console.log(data);
    };
    window.location.href = '/api';
    console.log('hej');
  };
  const getSongs = async () => {
    const { data } = await axios.get('/api/songs');
    console.log(data);
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path='/'
          exact
          render={() => (
            <>
              <h1>Log in with your Spotify account</h1>
              <button onClick={() => redirectToAuth()}>Sign in</button>
              <button onClick={() => getSongs()}>Show random songs</button>
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
