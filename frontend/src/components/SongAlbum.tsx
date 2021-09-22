import * as React from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Album } from '../screens/Main/interfaces';

const SongAlbum = ({ album }: { album: Album }) => (
  <Link component={RouterLink} to={`/albums/${album.id}`}>
    {album.name}
  </Link>
);

export default SongAlbum;
