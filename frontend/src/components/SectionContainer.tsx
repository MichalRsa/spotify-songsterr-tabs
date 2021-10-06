import {
  Button,
  CircularProgress,
  Grid,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import * as React from 'react';

interface SectionContainerProps {
  heading: string;
  btnAction: undefined | (() => any);
  children: React.ReactNode;
  loading: boolean;
}

const useStyles = makeStyles(() => ({
  albumWidth: {
    width: '100%',
  },
  listItem: {
    padding: 0,
  },
  heading: { width: '100%', padding: '1.4rem 0 .6rem' },
  button: {
    marginTop: '.6rem',
    '&:hover': {
      backgroundColor: 'green',
    },
  },
}));

const SectionContainer: React.FunctionComponent<SectionContainerProps> = ({
  heading,
  btnAction,
  children,
  loading,
}) => {
  const classes = useStyles();
  return (
    <Grid container component='section' justifyContent='flex-end'>
      <Typography component='h1' className={classes.heading}>
        {heading}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <List>{children}</List>
          {btnAction && (
            <Button
              variant='contained'
              className={classes.button}
              onClick={btnAction}
            >
              More
            </Button>
          )}
        </>
      )}
    </Grid>
  );
};

export default SectionContainer;
