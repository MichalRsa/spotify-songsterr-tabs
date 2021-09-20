/* eslint-disable no-console */
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';
import { Track } from '../screens/Main/interfaces/index';
import SongBarTuning from './SongsBarTuning';

interface MyTheme {
  palette: { success: { main: string }; error: { main: string } };
}

const useStyles = makeStyles((theme: MyTheme) => ({
  rootSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  rootFail: {
    backgroundColor: theme.palette.error.main,
  },
}));

const SongBar = ({ song: { album, name, artists } }: { song: Track }) => {
  const [tabs, setTabs] = React.useState<{ song: IsongsterrTabs }>();
  const [loading, setLoading] = React.useState(true);
  const styles = useStyles();
  React.useEffect(() => {
    const fetchTabs = async () => {
      const { data } = await axios.post(`api/songs/tabs`, {
        title: name,
        artist: artists[0].name,
      });

      setTabs(data);

      setLoading(false);
    };
    fetchTabs();
  }, []);
  console.log(tabs);

  const haveTabs = (): any => tabs && !!tabs.song.length;

  return (
    <ListItem
      button={!loading && haveTabs()}
      divider
      className={!loading && haveTabs() ? styles.rootSuccess : ''}
    >
      <ListItemAvatar>
        <Avatar
          variant='square'
          alt={album.name}
          src={`${album.images[album.images.length - 1].url}`}
        />
      </ListItemAvatar>
      <ListItemText>
        {!loading && haveTabs() ? (
          <Link
            href={`https://www.songsterr.com/a/wsa/${tabs?.song[0].artist}-${
              tabs?.song[0].title
            }-tab-s${tabs?.song[0].songId.toString()}`
              .split(' ')
              .join('-')
              .toLowerCase()}
          >
            <Typography variant='h6'>{name}</Typography>
          </Link>
        ) : (
          <Typography variant='h6'>{name}</Typography>
        )}
        <Typography component='span'>
          <Link component={RouterLink} to={`/artists/${artists[0].id}`}>
            {artists[0].name}
          </Link>
          <span> - </span>
          <Link component={RouterLink} to={`/albums/${album.id}`}>
            {album.name}
          </Link>
        </Typography>
      </ListItemText>
      <SongBarTuning tabs={tabs} loading={loading} />
    </ListItem>
  );
};

export default SongBar;
