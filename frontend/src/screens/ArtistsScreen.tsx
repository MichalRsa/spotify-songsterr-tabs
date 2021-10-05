/* eslint-disable no-console */
import { ImageList, ImageListItem, List } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongBar from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

const ArtistsScreen = () => {
  const [songs, setSongs] = React.useState<SpotifyApi.MultipleTracksResponse>();
  const [albums, setAlbums] =
    React.useState<SpotifyApi.ArtistsAlbumsResponse>();
  const { id } = useParams<Record<string, string | undefined>>();
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
          data: { data },
        } = await axios.post(`/api/songs/artists/albums`, {
          tokenFromStorage,
          id,
          limit,
          offset,
        });
        setAlbums(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(albums && albums.items);
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
      <ImageList cols={4} rowHeight='auto' gap={16}>
        {albums &&
          albums.items.slice(0, 4).map((item) => (
            <ImageListItem key={item.id}>
              {/* <Button onClick={() => history.push(`/albums/${item.album.id}`)}> */}
              <img
                // className={classes.albumWidth}
                src={item.images[0].url}
                alt='album-cover'
              />
              {/* </Button> */}
            </ImageListItem>
          ))}
      </ImageList>
    </>
  );
};
export default ArtistsScreen;
