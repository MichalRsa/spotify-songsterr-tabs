/* eslint-disable no-console */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { fetchFavsSongs } from '../actions/spotifyUserDataActions';
// import AlbumCard from '../components/AlbumCard';
import Pagination from '../components/Pagination';
import { RootState } from '../store';
import useQuery from '../hooks/useQuery';
import SongBar from '../components/SongsBar';
import SongAvatar from '../components/SongAvatar';
import SongArtist from '../components/SongBarArtist';
import SongAlbum from '../components/SongAlbum';

const UserTracksScreen = () => {
  const query = useQuery();
  const offset = query.get('offset') || undefined;
  const limit = query.get('limit') || undefined;

  const favTracks = useSelector(
    (state: RootState) => state.userFavorite?.favSongs
  );

  const total = useSelector(
    (state: RootState) => state.userFavorite?.favSongs?.total
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavsSongs(offset, limit));
  }, [offset, limit]);

  return (
    <>
      <Grid container>
        {total && <h2>You have {total} tracks in collection</h2>}
        {favTracks &&
          favTracks.items.map(({ track: song }) => (
            <SongBar
              key={song.id + Math.random()}
              song={song}
              avatarChild={<SongAvatar album={song.album} />}
              artistChild={<SongArtist artists={song.artists} />}
              albumChild={<SongAlbum album={song.album} />}
            />
          ))}
      </Grid>
      <Pagination pagination={favTracks} route='/user/tracks' />
    </>
  );
};

export default UserTracksScreen;
