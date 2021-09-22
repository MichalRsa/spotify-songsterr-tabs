import * as React from 'react';
import { Link, Typography } from '@material-ui/core';

const SongTitle = ({ loading, tabs, name, haveTabs }: any) =>
  !loading && haveTabs ? (
    <Link
      href={`https://www.songsterr.com/a/wsa/${tabs?.song[0].artist}-${
        tabs?.song[0].title
      }-tab-s${tabs?.song[0].songId.toString()}`
        .split(' ')
        .join('-')
        .toLowerCase()}
    >
      <Typography style={{ fontWeight: 'bold' }}>{name}</Typography>
    </Link>
  ) : (
    <Typography style={{ fontWeight: 'bold' }}>{name}</Typography>
  );

export default SongTitle;
