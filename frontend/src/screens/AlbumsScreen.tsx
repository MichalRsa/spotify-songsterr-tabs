/* eslint-disable no-console */
import { Container, List } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router';
import SongBar from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
import { ISongs } from './Main/interfaces';

const AlbumScreen = () => {
  const [songs, setSongs] = React.useState<ISongs>();
  const { id } = useParams<Record<string, string | undefined>>();
  console.log(id);
  React.useEffect(() => {
    const fetchData = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      console.log(tokenFromStorage);
      try {
        const {
          data: { songsData },
        } = await axios.post(`/api/songs/albums`, {
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
      {/* <h2>{songs?}</h2> */}
      <p>Most popular songs:</p>
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
export default AlbumScreen;
