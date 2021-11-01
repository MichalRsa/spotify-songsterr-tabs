/* eslint-disable no-console */
import {
  CircularProgress,
  Grid,
  Link,
  List,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import SongBar, { MyTheme } from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

const useStyles = makeStyles((theme: MyTheme) => ({
  rootSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  text: {
    '&&': {
      padding: '0 20px',
      textAlign: 'center',
    },
  },
  rootFail: {
    backgroundColor: theme.palette.error.main,
  },
  albumHeader: {
    alignItems: 'center',
    marginTop: '1rem',
  },
  img: {
    maxWidth: '100%',
  },
}));

const AlbumScreen = () => {
  const [songs, setSongs] = React.useState<SpotifyApi.AlbumTracksResponse>();
  const [album, setAlbum] = React.useState<SpotifyApi.SingleAlbumResponse>();
  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState<unknown>();
  const { id } = useParams<Record<string, string | undefined>>();

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const mediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(1000)
  );

  const classes = useStyles();
  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { songsData, albumData },
        } = await axios.post(`/api/songs/albums`, {
          tokenFromStorage,
          id,
        });
        setSongs(songsData);
        setAlbum(albumData);
      } catch (err) {
        console.log(err);
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (error) {
    return <p>Cant find this item in database</p>;
  }

  if (loading) return <CircularProgress />;

  return (
    <>
      <Grid
        className={classes.albumHeader}
        container
        spacing={mediumScreen ? 4 : 10}
        direction={smallScreen ? 'column-reverse' : 'row'}
      >
        <Grid item xs={smallScreen ? 12 : 4}>
          <img
            className={classes.img}
            src={album?.images[1].url}
            alt={album?.name}
          />
        </Grid>
        <Grid
          item
          xs={smallScreen ? 12 : 8}
          className={smallScreen ? classes.text : ''}
        >
          {album && (
            <h2 className={smallScreen ? classes.text : ''}>
              {`${album?.name} by `}
              <Link
                component={RouterLink}
                to={`/artists/${album.artists[0].id}`}
                underline='always'
              >
                {album?.artists[0].name}
              </Link>
            </h2>
          )}
        </Grid>
      </Grid>
      {songs && (
        <List component='ol'>
          {songs.items.map((song) => (
            <SongBar key={song.id} song={song} />
          ))}
        </List>
      )}
    </>
  );
};
export default AlbumScreen;
