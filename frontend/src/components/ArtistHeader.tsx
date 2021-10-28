import { makeStyles, Theme } from '@material-ui/core';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    width: '100%',
    //     transform: 'translateY(-20%)',
    height: 'auto',
    zIndex: 0,
    filter: 'brightness(50%)',

    [theme.breakpoints.down(500)]: {
      transform: 'translateY(0%)',
    },
  },
  title: {
    zIndex: 10,
    bottom: 0,
    left: 0,
    position: 'absolute',
    color: 'white',
    fontSize: 'min(14vw, 120px)',
    margin: 0,
    lineHeight: '1',

    [theme.breakpoints.down(500)]: {
      lineHeight: 'normal',
    },
  },
  imgContainer: {
    width: '100%',
    maxHeight: '460px',
    overflow: 'hidden',
    position: 'relative',

    [theme.breakpoints.down(500)]: {
      height: 'auto',
    },
  },
}));

const ArtistHeader = ({
  artist,
}: {
  artist: SpotifyApi.ArtistObjectFull | undefined;
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.imgContainer}>
        <img
          src={artist?.images[0]?.url}
          alt={artist?.name}
          className={classes.img}
        />
        <h1 className={classes.title}>{artist?.name}</h1>
      </div>
    </>
  );
};

export default ArtistHeader;
