/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import {
  // Avatar,
  Container,
  List,
  // ListItem,
  // ListItemAvatar,
  // ListItemText,
  // Typography,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import SongBar from '../../components/SongsBar';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
// import useQuery from '../hooks/useQuery';
import { getTokenFromLocalStorage } from '../../utils/setLocalStorage';
import { ISongs } from './interfaces';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';

const Main = () => {
  const [songs, setSongs] = React.useState<ISongs>();
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const query = useQuery();
  // const code = query.get('code');
  // const body = {
  //   code,
  // };
  console.log('render main component!', songs);
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
        // setTokenInLocalStorage(refresh_token);
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
            <SongBar song={song} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default Main;
