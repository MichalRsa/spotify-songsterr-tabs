/* eslint-disable no-console */
import {
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  List,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import ArtistHeader from '../components/ArtistHeader';
import ListButton from '../components/ListButton';
import SectionContainer from '../components/SectionContainer';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongBar from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

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

const ArtistsScreen = () => {
  const [songs, setSongs] = React.useState<SpotifyApi.MultipleTracksResponse>();
  const [albums, setAlbums] =
    React.useState<SpotifyApi.MultipleAlbumsResponse>();
  const [artist, setArtist] = React.useState<
    SpotifyApi.ArtistObjectFull | undefined
  >();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<unknown>();
  const { id } = useParams<Record<string, string | undefined>>();

  const history = useHistory();
  const classes = useStyles();

  React.useEffect(() => {
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { songsData },
        } = await axios.post(`/api/songs/artist-tracks`, {
          tokenFromStorage,
          id,
        });

        const limit = 4;
        const offset = 0;

        const {
          data: { albumsData },
        } = await axios.post(`/api/songs/artists/albums`, {
          tokenFromStorage,
          id,
          limit,
          offset,
        });
        const {
          data: { artistData },
        } = await axios.post(`/api/songs/artist/`, {
          tokenFromStorage,
          id,
        });

        setSongs(songsData);
        setAlbums(albumsData);
        setArtist(artistData);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (error) return <p>Cant&apos;t find this item in database</p>;
  if (loading) return <CircularProgress />;
  return (
    <>
      <ArtistHeader artist={artist} />
      <p>Most popular songs:</p>
      {songs && (
        <List component='ol'>
          {songs.tracks.map((song) => (
            <SongBar
              key={song.id}
              song={song}
              avatarChild={<SongAvatar album={song.album} />}
              albumChild={<SongAlbum album={song.album} />}
            />
          ))}
        </List>
      )}

      {albums && (
        <SectionContainer heading='Albums:' loading={false}>
          <ImageList cols={4} rowHeight='auto'>
            {albums.albums.slice(0, 4).map((item) => (
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
          <ListButton btnAction={`/${id}/albums`} />
        </SectionContainer>
      )}
    </>
  );
};
export default ArtistsScreen;
