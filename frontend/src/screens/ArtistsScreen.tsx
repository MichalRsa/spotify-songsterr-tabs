/* eslint-disable no-console */
import {
  Button,
  ImageList,
  ImageListItem,
  List,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useHistory, useParams } from 'react-router';
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
  const { id } = useParams<Record<string, string | undefined>>();

  const history = useHistory();
  const classes = useStyles();

  React.useEffect(() => {
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { songsData },
        } = await axios.post(`/api/songs/artists`, {
          tokenFromStorage,
          id,
        });
        setSongs(songsData);

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
        setAlbums(albumsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(albums && albums.albums);
  return (
    <>
      <h2>{songs?.tracks[0].artists[0].name}</h2>
      <p>Most popular songs:</p>
      {songs && (
        <List component='ol'>
          {songs.tracks.map((song) => (
            <SongBar
              key={song.id + Math.random()}
              song={song}
              avatarChild={<SongAvatar album={song.album} />}
              albumChild={<SongAlbum album={song.album} />}
            />
          ))}
        </List>
      )}

      {albums && (
        <SectionContainer
          heading='Albums:'
          btnAction={() => {
            history.push(`/${id}/albums`);
          }}
          loading={false}
        >
          <ImageList cols={4} rowHeight='auto' gap={16}>
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
        </SectionContainer>
      )}
    </>
  );
};
export default ArtistsScreen;
