import {
  Button,
  Container,
  Grid,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { fetchTestToken } from '../actions/spotifyAuthActions';

const Image1 = require('../public/kartaUtworu.png');
const Image2 = require('../public/image 2.png');
const Rectangle = require('../public/Rectangle 2.svg');

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    paddingTop: '20px',
    paddingBottom: '20px',
    flexDirection: 'column',
    //     position: 'relative',
    // textAlign: 'left',
    // width: '100vw',
    //     margin: '5rem',

    // position: 'absolute',
    // top: '40%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${Rectangle})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: '100% 0%',
    backgroundOrigin: 'content-box',
  },
  firstSection: {
    padding: '0 40px',
    [theme.breakpoints.down(940)]: {
      padding: 0,
    },
  },
  heading: {
    marginTop: '0',
  },
  gridText: {
    maxWidth: '400px',
  },
  gridImgContainer: {
    maxWidth: '400px',
  },
  gridImg: {
    width: '100%',
  },

  img: {
    width: 'min(600px, 100%)',
    borderRadius: '20px',
  },
  imgContainer: {
    textAlign: 'right',
    padding: '0 40px',
    [theme.breakpoints.down(940)]: {
      padding: 0,
      textAlign: 'center',
      paddingTop: '10px',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '40px',
    [theme.breakpoints.down(940)]: {
      margin: '0 10px 10px',
    },
  },
}));

const LoginScreen = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(940)
  );

  const redirectToAuth = () => {
    window.location.href = '/api/user';
  };

  const logTestUser = () => {
    dispatch(fetchTestToken());
  };

  // eslint-disable-next-line no-console
  console.log(smallScreen);
  return (
    <Route>
      <Container maxWidth='md' className={classes.container}>
        <Grid
          className={classes.firstSection}
          container
          justifyContent='space-between'
          // justifyContent={smallScreen ? 'center' : 'space-between'}
          direction={!smallScreen ? 'row' : 'column'}
          // direction='column'
          // direction={smallScreen ? 'column' : 'row'}
          alignItems='center'
        >
          <Grid item className={classes.gridText}>
            <h1>Use your spotify data to look for songsterr tabs.</h1>
            <p>
              It is only reading your data, and don&apos;t store it on external
              databse or interfere it
            </p>
            <h2>Log in with your Spotify account</h2>
            <p className={classes.buttons}>
              <Button
                color='secondary'
                variant='contained'
                onClick={redirectToAuth}
              >
                Sign in
              </Button>{' '}
              <Button
                variant='outlined'
                color='secondary'
                onClick={logTestUser}
              >
                test user
              </Button>{' '}
            </p>
          </Grid>
          <Grid item className={classes.gridImgContainer}>
            <img
              src={Image2}
              className={classes.gridImg}
              alt='song bar display'
            />
          </Grid>
        </Grid>
        <Grid item className={classes.imgContainer}>
          <img src={Image1} className={classes.img} alt='song bar display' />
        </Grid>
      </Container>
    </Route>
  );
};

export default LoginScreen;
