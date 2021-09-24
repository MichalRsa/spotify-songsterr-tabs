/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import { List } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import SongAlbum from '../../components/SongAlbum';
import SongAvatar from '../../components/SongAvatar';
import SongArtist from '../../components/SongBarArtist';
import SongBar from '../../components/SongsBar';
import { getTokenFromLocalStorage } from '../../utils/setLocalStorage';
import { ISongs } from './interfaces';

const Main = () => {
  const [songs, setSongs] = React.useState<ISongs>();
  useEffect(() => {
    const fetchRecent = async () => {
      if (songs === undefined) {
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
      }
    };
    const fetchFavs = async () => {};
    fetchRecent();
    fetchFavs();
  }, []);

  return (
    <>
      <h2>Your recently played tracks:</h2>
      {songs && (
        <>
          <List component='ol'>
            {songs.tracks.slice(0, 10).map((song) => (
              <SongBar
                key={song.id + Math.random()}
                song={song}
                avatarChild={<SongAvatar album={song.album} />}
                artistChild={<SongArtist artists={song.artists} />}
                albumChild={<SongAlbum album={song.album} />}
              />
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default Main;
