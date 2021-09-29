/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import SectionContainer from '../components/SectionContainer';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongArtist from '../components/SongBarArtist';
import SongBar from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
import { Album, ISongs } from '../../typings';

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
  const [recent, setRecent] = React.useState<ISongs>();
  const [favTracks, setFavTracks] = React.useState<ISongs>();
  const [albums, setAlbums] =
    React.useState<{ album: Album; added_at: string }[]>();

  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    const fetchRecent = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { songsData },
        } = await axios.post('/api/user-library/recent', {
          tokenFromStorage,
        });
        setRecent(songsData);
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
    const fetchFavsSongs = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { songsData },
        } = await axios.post('/api/user-library/tracks', {
          tokenFromStorage,
        });
        setFavTracks(songsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecent();
    fetchUserAlbums();
    fetchFavsSongs();
  }, []);

  return (
    <>
      <SectionContainer
        heading='Your favorite albums:'
        btnAction={() => {
          history.push('/user/albums');
        }}
      >
        <ImageList cols={4} rowHeight='auto' gap={16}>
          {albums &&
            albums.slice(0, 4).map((item) => (
              <ImageListItem key={item.album.id} className={classes.listItem}>
                <Button
                  onClick={() => history.push(`/albums/${item.album.id}`)}
                >
                  <img
                    className={classes.albumWidth}
                    src={item.album.images[0].url}
                    alt='album-cover'
                  />
                </Button>
              </ImageListItem>
            ))}
        </ImageList>
      </SectionContainer>

      <SectionContainer
        heading='Your recently played tracks:'
        btnAction={() => {
          history.push('/user/recent');
        }}
      >
        <Grid container>
          {recent &&
            recent.tracks
              .slice(0, 10)
              .map((song) => (
                <SongBar
                  key={song.id + Math.random()}
                  song={song}
                  avatarChild={<SongAvatar album={song.album} />}
                  artistChild={<SongArtist artists={song.artists} />}
                  albumChild={<SongAlbum album={song.album} />}
                />
              ))}
        </Grid>
      </SectionContainer>

      <SectionContainer
        heading='Your favorite tracks:'
        btnAction={() => {
          history.push('/user/tracks');
        }}
      >
        <Grid container>
          {favTracks &&
            favTracks.tracks
              .slice(0, 10)
              .map((song) => (
                <SongBar
                  key={song.id + Math.random()}
                  song={song}
                  avatarChild={<SongAvatar album={song.album} />}
                  artistChild={<SongArtist artists={song.artists} />}
                  albumChild={<SongAlbum album={song.album} />}
                />
              ))}
        </Grid>
      </SectionContainer>
    </>
  );
};

export default Main;
