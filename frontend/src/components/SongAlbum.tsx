import * as React from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
// import { Album } from '../../typings/index';

const SongAlbum = ({ album }: { album: SpotifyApi.AlbumObjectSimplified }) => (
  <Link component={RouterLink} to={`/albums/${album.id}`}>
    {album.name}
  </Link>
);

export default SongAlbum;
