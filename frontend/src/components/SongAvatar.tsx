import * as React from 'react';

import { Avatar, ListItemAvatar } from '@material-ui/core';
import { Album } from '../../typings/index';

const SongAvatar = ({ album }: { album: Album }) => (
  <ListItemAvatar>
    <Avatar
      variant='square'
      alt={album.name}
      src={`${album.images[album.images.length - 1].url}`}
    />
  </ListItemAvatar>
);

export default SongAvatar;
