import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  makeStyles,
} from '@material-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import SectionContainer from '../components/SectionContainer';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongArtist from '../components/SongBarArtist';
import SongBar from '../components/SongsBar';
import {
  fetchFavsSongs,
  fetchRecent,
  fetchUserAlbums,
} from '../actions/spotifyUserDataActions';
import { RootState } from '../store';

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
  const dispatch = useDispatch();

  const recentLoading = useSelector(
    (state: RootState) => state.userRecent?.loading
  );

  const recent = useSelector(
    (state: RootState) => state.userRecent?.recent?.tracks
  );

  const favTracksLoading = useSelector(
    (state: RootState) => state.userFavorite?.loading
  );
  const favTracks = useSelector(
    (state: RootState) => state.userFavorite?.favSongs?.items
  );

  const albumsLoading = useSelector(
    (state: RootState) => state.userFavorite?.loading
  );
  const albums = useSelector(
    (state: RootState) => state.userAlbums?.albums?.items
  );

  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    if (recent === undefined) dispatch(fetchRecent());
    if (albums === undefined) dispatch(fetchUserAlbums());
    if (favTracks === undefined) dispatch(fetchFavsSongs());
  }, []);

  return (
    <>
      <SectionContainer
        heading='Your favorite albums:'
        btnAction={() => {
          history.push('/user/albums');
        }}
        loading={!!albumsLoading}
      >
        <ImageList cols={4} rowHeight='auto'>
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
        loading={!!recentLoading}
      >
        <Grid container>
          {recent &&
            recent
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
        loading={!!favTracksLoading}
      >
        <Grid container>
          {favTracks &&
            favTracks
              .slice(0, 10)
              .map(({ track: song }) => (
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
