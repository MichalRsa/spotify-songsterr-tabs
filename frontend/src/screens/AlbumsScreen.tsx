/* eslint-disable no-console */
import { Grid, List, makeStyles } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import SongBar, { MyTheme } from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
import { Album, ISongs } from './Main/interfaces';

const useStyles = makeStyles((theme: MyTheme) => ({
  rootSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  rootFail: {
    backgroundColor: theme.palette.error.main,
  },
  albumHeader: {
    marginTop: '1rem',
  },
}));

const AlbumScreen = () => {
  const [songs, setSongs] = React.useState<ISongs>();
  const [album, setAlbum] = React.useState<Album>();
  const { id } = useParams<Record<string, string | undefined>>();

  const classes = useStyles();
  React.useEffect(() => {
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      console.log(tokenFromStorage);
      try {
        const {
          data: { songsData },
        }: { data: { songsData: ISongs } } = await axios.post(
          `/api/songs/albums`,
          {
            tokenFromStorage,
            id,
          }
        );
        setSongs(songsData);
        const albumData = songsData.tracks[0].album;
        setAlbum(albumData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Grid className={classes.albumHeader} container spacing={10}>
        <Grid item xs={6}>
          <img
            src={songs?.tracks[0].album.images[1].url}
            alt={songs?.tracks[0].album.name}
          />
        </Grid>
        <Grid item xs={6}>
          {album && <h2>{`${album?.name} by ${album?.artists[0].name}`}</h2>}
        </Grid>
      </Grid>
      {songs && (
        <List component='ol'>
          {songs.tracks.map((song) => (
            <SongBar key={song.id + Math.random()} song={song} />
          ))}
        </List>
      )}
    </>
  );
};
export default AlbumScreen;
