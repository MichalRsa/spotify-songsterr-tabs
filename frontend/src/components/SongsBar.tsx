import * as React from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Track } from '../screens/Main/interfaces/index';

const SongBar = ({ song: { album, name, artists } }: { song: Track }) => (
  <ListItem button divider>
    <ListItemAvatar>
      <Avatar
        variant='square'
        alt={album.name}
        src={`${album.images[album.images.length - 1].url}`}
      />
    </ListItemAvatar>
    <ListItemText>
      <Typography variant='h6'>{name}</Typography>
      <Typography component='span'>{artists[0].name}</Typography>
    </ListItemText>
  </ListItem>
);

export default SongBar;
