/* eslint-disable no-console */
import { Grid } from '@material-ui/core';
// import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchRecent } from '../actions/spotifyUserDataActions';
import SectionContainer from '../components/SectionContainer';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongArtist from '../components/SongBarArtist';
import SongBar from '../components/SongsBar';
import { RootState } from '../store';
// import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
// import { ISongs } from '../../typings';

const RecentScreen = () => {
  const recentLoading = useSelector(
    (state: RootState) => state.userRecent?.loading
  );
  const recent = useSelector(
    (state: RootState) => state.userRecent?.recent?.tracks
  );
  // const [recent, setRecent] =
  //   React.useState<SpotifyApi.MultipleTracksResponse>();

  useEffect(() => {
    // const fetchRecent = async () => {
    //   const tokenFromStorage = getTokenFromLocalStorage();
    //   try {
    //     const {
    //       data: { songsData },
    //     } = await axios.post('/api/user-library/recent', {
    //       tokenFromStorage,
    //     });
    //     setRecent(songsData);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    fetchRecent();
  }, []);

  return (
    <>
      <SectionContainer
        heading='Your recently played tracks:'
        btnAction={undefined}
        loading={!!recentLoading}
      >
        <Grid container>
          {recent &&
            recent.map((song) => (
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
