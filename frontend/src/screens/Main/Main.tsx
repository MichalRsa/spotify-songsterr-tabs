/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import {
  Button,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import SongAlbum from '../../components/SongAlbum';
import SongAvatar from '../../components/SongAvatar';
import SongArtist from '../../components/SongBarArtist';
import SongBar from '../../components/SongsBar';
import { getTokenFromLocalStorage } from '../../utils/setLocalStorage';
import { Album, ISongs } from './interfaces';

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
const Main = () => {
  const [songs, setSongs] = React.useState<ISongs>();
  const [albums, setAlbums] =
    React.useState<{ album: Album; added_at: string }[]>();

  const classes = useStyles();

  useEffect(() => {
    const fetchRecent = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { songsData },
        } = await axios.post('api/user-library/recent', {
          tokenFromStorage,
        });
        setSongs(songsData);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchUserAlbums = async () => {
      console.log('fetchAlbums');
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { data },
        } = await axios.post('api/user-library/albums', {
          tokenFromStorage,
        });
        console.log(data.items);
        setAlbums(data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecent();
    fetchUserAlbums();
  }, []);

  return (
    <>
      <Grid container component='section' justifyContent='flex-end'>
        <Typography component='h1' className={classes.heading}>
          Your favorite albums:
        </Typography>
        <List>
          <Grid container spacing={2}>
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
          </Grid>
        </List>
        <Button variant='contained' className={classes.button}>
          More
        </Button>
      </Grid>
      <Grid>
        <h2>Your recently played tracks:</h2>
        {songs && (
          <>
            <List component='ol'>
              {songs.tracks.slice(0, 10).map((song) => (
                <SongBar
                  key={song.id + Math.random()}
                  song={song}
                  avatarChild={<SongAvatar album={song.album} />}
                  artistChild={<SongArtist artists={song.artists} />}
                  albumChild={<SongAlbum album={song.album} />}
                />
              ))}
            </List>
          </>
        )}
      </Grid>
    </>
  );
};

export default Main;
