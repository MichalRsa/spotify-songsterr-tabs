/* eslint-disable no-console */
import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import AuthRedirect from './screens/Redirect';
import Main from './screens/Main';
import { RootState } from './store';
import AlbumsScreen from './screens/AlbumsScreen';
import ArtistsScreen from './screens/ArtistsScreen';
import UserAlbumsScreen from './screens/UserAlbumsScreen';
import NavBar from './components/Nav';
import RecentScreen from './screens/RecentScreen';
import Footer from './components/Footer';
import UserTracksScreen from './screens/UserTracksScreen';
import ArtistAlbumsScreen from './screens/ArtistAlbumsScreen';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import NotFoundScreen from './screens/NotFoundScreen';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main: {
    display: 'flex',
    flexGrow: 10,
    position: 'relative',
  },
}));

const App = () => {
  const user = useSelector((store: RootState) => store.spotifyAuth?.user);

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.container}>
        <CssBaseline />
        <NavBar />
        <div className={classes.main}>
          {user ? (
            <Container maxWidth='md'>
              <Switch>
                <Route path='/main' component={Main} />
                <Route path='/search' component={SearchScreen} />
                <Route path='/albums/:id' component={AlbumsScreen} />
                <Route path='/user/albums' component={UserAlbumsScreen} />
                <Route path='/user/recent' component={RecentScreen} />
                <Route path='/user/tracks' component={UserTracksScreen} />
                <Route path='/artists/:id' component={ArtistsScreen} />
                <Route path='/:artists/albums' component={ArtistAlbumsScreen} />
                <Redirect from='/redirect' to='/main' />
                <Redirect from='/' exact to='/main' />
                <Route component={NotFoundScreen} />
              </Switch>
            </Container>
          ) : (
            <Switch>
              <Route path='/redirect' component={AuthRedirect} />
              <Route path='/' component={LoginScreen} />
            </Switch>
          )}
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
