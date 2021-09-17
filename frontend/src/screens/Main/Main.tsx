/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
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
      <h2>Your recent played tracks:</h2>
      {songs && (
        <List component='ol'>
          {songs.tracks.map((song) => (
            <ListItem button divider>
              <ListItemAvatar>
                <Avatar
                  variant='square'
                  alt={song.album.name}
                  src={`${song.album.images[song.album.images.length - 1].url}`}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography variant='h6'>{song.name}</Typography>
                <Typography component='span'>{song.artists[0].name}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Main;
