import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { fetchTestToken } from '../actions/spotifyAuthActions';

const Image2 = require('../public/kartaUtworu.png');

const useStyles = makeStyles(() => ({
  container: {
    //     position: 'relative',
    textAlign: 'left',
    width: '100vw',
    //     margin: '5rem',

    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  heading: {
    marginTop: '0',
  },
}));

const LoginScreen = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const redirectToAuth = () => {
    window.location.href = '/api/user';
  };

  const logTestUser = () => {
    dispatch(fetchTestToken());
  };

  return (
    <Route>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Grid item>
            <h1>Use your spotify data to look for songsterr tabs.</h1>
            <p>
              It is only reading your data, and don&apos;t store it on external
              databse or interfere it
            </p>
            <h2>Log in with your Spotify account</h2>
            <p>
              <Button
                color='secondary'
                variant='contained'
                onClick={redirectToAuth}
              >
                Sign in
              </Button>{' '}
              or use{' '}
              <Button
                variant='outlined'
                color='secondary'
                onClick={logTestUser}
              >
                test user
              </Button>{' '}
              account
            </p>
          </Grid>
          <Grid item>
            <img src={Image2} alt='song bar display' />
          </Grid>
        </Grid>
      </Container>
    </Route>
  );
};

export default LoginScreen;
