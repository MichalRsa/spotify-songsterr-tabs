/* eslint-disable no-console */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAlbums } from '../actions/spotifyUserDataActions';
import AlbumCard from '../components/AlbumCard';
import Pagination from '../components/Pagination';
import { RootState } from '../store';
import useQuery from '../hooks/useQuery';

const UserAlbumsScreen = () => {
  const query = useQuery();
  const offset = query.get('offset') || undefined;
  const limit = query.get('limit') || undefined;
  const albums = useSelector(
    (state: RootState) => state.userAlbums?.albums?.items
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAlbums(offset, limit));
  }, [offset, limit]);

  return (
    <>
      {albums &&
        albums.map(({ album }) => <AlbumCard key={album.id} album={album} />)}
      <Pagination />
    </>
  );
};

export default UserAlbumsScreen;
