import { Link, makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
// import { MyTheme } from './SongsBar';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    backgroundColor: theme.palette.secondary.dark,
    marginTop: '2rem',
    paddingTop: '1rem',
    textAlign: 'center',
  },
  paragraph: {
    paddingBottom: '1rem',
    color: 'white',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography className={classes.paragraph}>
        This app is one of the projects that I made for my web dev portfolio.
      </Typography>

      <Typography className={classes.paragraph}>Find me on</Typography>
      <div className={classes.paragraph}>
        <Link className={classes.paragraph} href='https://github.com/MichalRsa'>
          <GitHubIcon />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
