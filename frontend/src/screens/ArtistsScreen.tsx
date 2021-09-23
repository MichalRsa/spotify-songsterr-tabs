/* eslint-disable no-console */
import { List } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
// import SongArtist from '../components/SongBarArtist';
import SongBar from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
import { ISongs } from './Main/interfaces';

const ArtistsScreen = () => {
  const [songs, setSongs] = React.useState<ISongs>();
  const { id } = useParams<Record<string, string | undefined>>();
  React.useEffect(() => {
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      console.log(tokenFromStorage);
      try {
        const {
          data: { songsData },
        } = await axios.post(`/api/songs/artists`, {
          tokenFromStorage,
          id,
        });
        setSongs(songsData);
        console.log(songsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
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
    </>
  );
};
export default ArtistsScreen;
