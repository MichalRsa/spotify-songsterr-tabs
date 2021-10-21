import { Button, Container, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Route } from 'react-router';

const useStyles = makeStyles(() => ({
  container: {
    //     position: 'relative',
    textAlign: 'center',
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
  const classes = useStyles();

  const redirectToAuth = () => {
    window.location.href = '/api/user';
  };
  return (
    <Route>
      <Container maxWidth='md' className={classes.container}>
        <h1 className={classes.heading}>Welcome!</h1>
        <p>
          Tab finder is an app that use your spotify data to look for songsterr
          tabs.
        </p>
        <p>
          It is only read your data, and don&apos;t store it on external databse
          or interfere it
        </p>
        <h2>Log in with your Spotify account</h2>
        <Button color='primary' variant='contained' onClick={redirectToAuth}>
          Sign in
        </Button>
      </Container>
    </Route>
  );
};

export default LoginScreen;
