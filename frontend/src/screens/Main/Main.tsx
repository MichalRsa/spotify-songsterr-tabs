/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import {
  Container,
  List,
  ListItem,
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
        console.log(songs);
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
          {songs.items.map((song) => (
            <ListItem button divider>
              <ListItemText>
                <Typography variant='h6'>{song.track.name}</Typography>
                <Typography component='span'>
                  {song.track.artists[0].name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Main;
