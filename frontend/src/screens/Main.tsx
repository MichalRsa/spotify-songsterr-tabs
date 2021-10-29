import {
  Button,
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
import ListButton from '../components/ListButton';

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

  const userRecent = useSelector((state: RootState) => state.userRecent!);
  const { loading: recentLoading, recent } = userRecent;

  const userFavofite = useSelector((state: RootState) => state.userFavorite!);
  const { loading: favTracksLoading, favSongs } = userFavofite;

  const userAlbums = useSelector((state: RootState) => state.userAlbums!);
  const { loading: albumsLoading, albums } = userAlbums;

  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    if (recent === undefined) dispatch(fetchRecent());
    if (albums === undefined) dispatch(fetchUserAlbums());
    if (favSongs === undefined) dispatch(fetchFavsSongs());
  }, []);

  return (
    <>
      <SectionContainer
        heading='Your favorite albums:'
        loading={!!albumsLoading}
      >
        {albums?.items?.length ? (
          <>
            <ImageList cols={4} rowHeight='auto'>
              {albums?.items?.slice(0, 4).map((item) => (
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
            {albums?.items?.length > 4 && (
              <ListButton btnAction='/user/albums' />
            )}
          </>
        ) : (
          <p>Your playlist is empty</p>
        )}
      </SectionContainer>

      <SectionContainer
        heading='Your recently played tracks:'
        loading={!!recentLoading}
      >
        {recent?.tracks?.length ? (
          <>
            {recent?.tracks?.slice(0, 10).map((song) => (
              <SongBar
                key={song.id + Math.random()}
                song={song}
                avatarChild={<SongAvatar album={song.album} />}
                artistChild={<SongArtist artists={song.artists} />}
                albumChild={<SongAlbum album={song.album} />}
              />
            ))}
            {recent?.tracks?.length > 10 && (
              <ListButton btnAction='/user/recent' />
            )}
          </>
        ) : (
          <p>Your playlist is empty</p>
        )}
      </SectionContainer>

      <SectionContainer
        heading='Your favorite tracks:'
        loading={!!favTracksLoading}
      >
        {favSongs?.items?.length ? (
          <>
            {favSongs?.items?.slice(0, 10).map(({ track: song }) => (
              <SongBar
                key={song.id + Math.random()}
                song={song}
                avatarChild={<SongAvatar album={song.album} />}
                artistChild={<SongArtist artists={song.artists} />}
                albumChild={<SongAlbum album={song.album} />}
              />
            ))}

            {favSongs?.items?.length > 10 && (
              <ListButton btnAction='/user/tracks' />
            )}
          </>
        ) : (
          <p>Your playlist is empty</p>
        )}
      </SectionContainer>
    </>
  );
};

export default Main;
