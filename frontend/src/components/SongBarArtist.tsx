import * as React from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Artist2 } from '../../typings/index';

const SongArtist = ({ artists }: { artists: Artist2[] }) => (
  <Link component={RouterLink} to={`/artists/${artists[0].id}`}>
    {artists[0].name}
  </Link>
);

export default SongArtist;
