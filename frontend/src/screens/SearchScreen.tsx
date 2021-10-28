/* eslint-disable no-console */
import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  makeStyles,
} from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ArtistHeader from '../components/ArtistHeader';
import SectionContainer from '../components/SectionContainer';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongArtist from '../components/SongBarArtist';
import SongBar from '../components/SongsBar';
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

const SearchScreen = () => {
  const albums = useSelector(
    (state: RootState) => state.spotifySearch.search?.albums?.items
  );
  const loading = useSelector(
    (state: RootState) => state.spotifySearch.loading
  );
  const artist = useSelector(
    (state: RootState) => state.spotifySearch.search?.artists?.items[0]
  );
  const tracks = useSelector(
    (state: RootState) => state.spotifySearch.search?.tracks?.items
  );

  const history = useHistory();

  const classes = useStyles();

  return (
    <>
      <Button fullWidth onClick={() => history.push(`/artists/${artist?.id}`)}>
        <ArtistHeader artist={artist} />
      </Button>
      <SectionContainer
        heading='Albums:'
        btnAction={undefined}
        loading={!!loading}
      >
        <ImageList cols={4} rowHeight='auto'>
          {albums &&
            albums.slice(0, 4).map((item) => (
              <ImageListItem key={item.id} className={classes.listItem}>
                <Button onClick={() => history.push(`/albums/${item.id}`)}>
                  <img
                    className={classes.albumWidth}
                    src={item.images[0].url}
                    alt='album-cover'
                  />
                </Button>
              </ImageListItem>
            ))}
        </ImageList>
      </SectionContainer>

      {/* <SectionContainer
        heading='Artists:'
        btnAction={undefined}
        loading={!!loading}
      >
        <ImageList cols={4} rowHeight='auto'>
          {artists &&
            artists.slice(0, 4).map((item) => (
              <ImageListItem key={item.id} className={classes.listItem}>
                <Button onClick={() => history.push(`/artists/${item.id}`)}>
                  <img
                    className={classes.albumWidth}
                    src={item?.images[0]?.url}
                    alt='album-cover'
                  />
                </Button>
              </ImageListItem>
            ))}
        </ImageList>
      </SectionContainer> */}

      <SectionContainer
        heading='Tracks:'
        btnAction={undefined}
        loading={!!loading}
      >
        <Grid container>
          {tracks &&
            tracks
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

export default SearchScreen;
