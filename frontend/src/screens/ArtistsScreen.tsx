/* eslint-disable no-console */
import { Container, List } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import SongAvatar from '../components/SongAvatar';
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
    <Container maxWidth='md'>
      <h2>{songs?.tracks[0].artists[0].name}</h2>
      <p>Most popular songs:</p>
      {songs && (
        <List component='ol'>
          {songs.tracks.map((song) => (
            <SongBar
              key={song.id + Math.random()}
              song={song}
              avatarChildren={<SongAvatar album={song.album} />}
            />
          ))}
        </List>
      )}
    </Container>
  );
};
export default ArtistsScreen;
