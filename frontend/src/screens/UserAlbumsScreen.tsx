/* eslint-disable no-console */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAlbums } from '../actions/spotifyUserDataActions';
import AlbumCard from '../components/AlbumCard';
import { RootState } from '../store';

const UserAlbumsScreen = () => {
  const albums = useSelector((state: RootState) => state.userAlbums?.albums);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAlbums());
  }, []);

  return (
    <>
      {albums &&
        albums.map(({ album }) => <AlbumCard key={album.id} album={album} />)}
    </>
  );
};

export default UserAlbumsScreen;
