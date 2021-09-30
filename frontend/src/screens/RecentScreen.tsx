/* eslint-disable no-console */
import { Grid } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import SectionContainer from '../components/SectionContainer';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongArtist from '../components/SongBarArtist';
import SongBar from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
import { ISongs } from '../../typings';

const RecentScreen = () => {
  const [recent, setRecent] = React.useState<ISongs>();

  useEffect(() => {
    const fetchRecent = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { songsData },
        } = await axios.post('/api/user-library/recent', {
          tokenFromStorage,
        });
        setRecent(songsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecent();
  }, []);

  return (
    <>
      <SectionContainer
        heading='Your recently played tracks:'
        btnAction={undefined}
        // btnAction={undefined}
      >
        <Grid container>
          {recent &&
            recent.tracks.map((song) => (
              <SongBar
                key={song.id + Math.random()}
                song={song}
                avatarChild={<SongAvatar album={song.album} />}
                artistChild={<SongArtist artists={song.artists} />}
                albumChild={<SongAlbum album={song.album} />}
              />
            ))}
        </Grid>
      </SectionContainer>
    </>
  );
};

export default RecentScreen;
