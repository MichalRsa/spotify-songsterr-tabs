/* eslint-disable no-console */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import AlbumCard from '../components/AlbumCard';
import Pagination from '../components/Pagination';
import useQuery from '../hooks/useQuery';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

const ArtistAlbumsScreen = () => {
  const [albums, setAlbums] =
    React.useState<SpotifyApi.MultipleAlbumsResponse>();

  const [pagination, setPagination] =
    React.useState<SpotifyApi.ArtistsAlbumsResponse>();

  const query = useQuery();
  const offset = query.get('offset') || 0;
  const limit = query.get('limit') || 10;

  const { artists } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    console.log(artists);
    const fetchUserAlbums = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const { data } = await axios.post(`/api/songs/artists/albums`, {
          tokenFromStorage,
          id: artists,
          limit,
          offset,
        });
        setAlbums(data.albumsData);
        setPagination(data.paginationData);
        console.log(data.paginationData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserAlbums();
  }, [offset, limit]);

  return (
    <>
      <h2> Artist Albums</h2>
      {albums &&
        albums.albums.map((item) => <AlbumCard key={item.id} album={item} />)}
      <Pagination pagination={pagination} route={`/${artists}/albums`} />
    </>
  );
};

export default ArtistAlbumsScreen;
