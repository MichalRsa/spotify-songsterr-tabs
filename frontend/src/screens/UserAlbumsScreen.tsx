/* eslint-disable no-console */

import axios from 'axios';
import React, { useEffect } from 'react';
import AlbumCard from '../components/AlbumCard';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

const UserAlbumsScreen = () => {
  const [albums, setAlbums] = React.useState<SpotifyApi.SavedAlbumObject[]>();

  // const classes = useStyles();

  useEffect(() => {
    const fetchUserAlbums = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { data },
        } = await axios.post('/api/user-library/albums', {
          tokenFromStorage,
        });
        console.log('album użytkownika', data);
        setAlbums(data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserAlbums();
  }, []);

  return (
    <>
      {albums &&
        albums.map(({ album }) => <AlbumCard key={album.id} album={album} />)}
    </>
  );
};

export default UserAlbumsScreen;
