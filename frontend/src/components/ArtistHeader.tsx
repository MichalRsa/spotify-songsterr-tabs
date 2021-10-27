import { makeStyles, Theme } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    width: '100%',
    transform: 'translateY(-20%)',
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
    fontSize: 'min(14vw, 160px)',
    margin: 0,
    lineHeight: '1',

    [theme.breakpoints.down(500)]: {
      lineHeight: 'normal',
    },
  },
  imgContainer: {
    height: '360px',
    overflow: 'hidden',
    position: 'relative',
    marginTop: '20px',

    [theme.breakpoints.down(500)]: {
      height: 'auto',
    },
  },
}));

const ArtistHeader = ({ id }: any) => {
  const [artist, setArtist] = React.useState<
    SpotifyApi.ArtistObjectFull | undefined
  >();

  const classes = useStyles();
  React.useEffect(() => {
    const fetchArtist = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      const {
        data: { data },
      } = await axios.post(`/api/songs/artist/`, {
        tokenFromStorage,
        id,
      });
      // eslint-disable-next-line no-console
      console.log(data);
      setArtist(data);
    };
    fetchArtist();
  }, []);
  return (
    <>
      <div className={classes.imgContainer}>
        <img
          src={artist?.images[0].url}
          alt={artist?.name}
          className={classes.img}
        />
        <h1 className={classes.title}>{artist?.name}</h1>
      </div>
    </>
  );
};

export default ArtistHeader;
