import { Button, Grid, List, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';

interface SectionContainerProps {
  heading: string;
  btnString: string;
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  albumWidth: {
    width: '100%',
  },
  listItem: {
    padding: 0,
  },
  heading: { width: '100%', padding: '1.4rem 0 .6rem' },
  button: { marginTop: '.6rem' },
}));

const SectionContainer: React.FunctionComponent<SectionContainerProps> = ({
  heading,
  btnString,
  children,
}) => {
  const classes = useStyles();
  return (
    <Grid container component='section' justifyContent='flex-end'>
      <Typography component='h1' className={classes.heading}>
        {heading}
      </Typography>
      <List>
        {children}
        {/* <Grid container spacing={2}>
          {albums &&
            albums.map((item) => (
              <Grid item xs={3}>
                <ListItem className={classes.listItem}>
                  <img
                    className={classes.albumWidth}
                    src={item.album.images[0].url}
                    alt='album-cover'
                  />
                </ListItem>
              </Grid>
            ))}
        </Grid> */}
      </List>
      <Button variant='contained' className={classes.button}>
        {btnString}
      </Button>
    </Grid>
  );
};

export default SectionContainer;
