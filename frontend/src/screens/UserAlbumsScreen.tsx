import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { fetchUserAlbums } from '../actions/spotifyUserDataActions';
import AlbumCard from '../components/AlbumCard';
import Pagination from '../components/Pagination';
import { RootState } from '../store';
import useQuery from '../hooks/useQuery';

const UserAlbumsScreen = () => {
  const query = useQuery();
  const offset = query.get('offset') || undefined;
  const limit = query.get('limit') || undefined;
  const albums = useSelector((state: RootState) => state.userAlbums?.albums);
  const total = useSelector(
    (state: RootState) => state.userAlbums?.albums?.total
  );

  const loading = useSelector((state: RootState) => state.userAlbums?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAlbums(offset, limit));
  }, [offset, limit]);

  if (loading) return <CircularProgress />;

  return (
    <>
      {total && <h2>You have {total} albums in collection</h2>}
      {albums &&
        albums.items.map(({ album }) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      <Pagination pagination={albums} route='/user/albums' />
    </>
  );
};

export default UserAlbumsScreen;
