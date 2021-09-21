/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import { Container, List } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import SongBar from '../../components/SongsBar';
import { getTokenFromLocalStorage } from '../../utils/setLocalStorage';
import { ISongs } from './interfaces';

const Main = () => {
  const [songs, setSongs] = React.useState<ISongs>();
  useEffect(() => {
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      console.log(tokenFromStorage);
      try {
        const {
          data: { songsData },
        } = await axios.post('api/songs/recent', {
          tokenFromStorage,
        });
        setSongs(songsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Container maxWidth='md'>
      <p>Hejka</p>
      <h2>Your recently played tracks:</h2>
      {songs && (
        <List component='ol'>
          {songs.tracks.map((song) => (
            <SongBar key={song.id + Math.random()} song={song} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default Main;
