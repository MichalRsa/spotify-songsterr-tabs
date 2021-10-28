import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecent } from '../actions/spotifyUserDataActions';
import SectionContainer from '../components/SectionContainer';
import SongAlbum from '../components/SongAlbum';
import SongAvatar from '../components/SongAvatar';
import SongArtist from '../components/SongBarArtist';
import SongBar from '../components/SongsBar';
import { RootState } from '../store';

const RecentScreen = () => {
  const recentLoading = useSelector(
    (state: RootState) => state.userRecent?.loading
  );
  const recent = useSelector(
    (state: RootState) => state.userRecent?.recent?.tracks
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecent());
  }, []);

  return (
    <>
      <SectionContainer
        heading='Your recently played tracks:'
        loading={!!recentLoading}
      >
        {recent &&
          recent.map((song) => (
            <SongBar
              key={song.id}
              song={song}
              avatarChild={<SongAvatar album={song.album} />}
              artistChild={<SongArtist artists={song.artists} />}
              albumChild={<SongAlbum album={song.album} />}
            />
          ))}
      </SectionContainer>
    </>
  );
};

export default RecentScreen;
