/* eslint-disable no-console */
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';
import { Track } from '../screens/Main/interfaces/index';
import SongBarTuning from './SongsBarTuning';
import SongAvatar from './SongAvatar';
import SongTitle from './SongTitle';

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

const SongBar = ({
  song: { album, name, artists },
  avatarChildren,
}: {
  song: Track;
  avatarChildren?: React.ReactElement<typeof SongAvatar>;
}) => {
  const [tabs, setTabs] = React.useState<{ song: IsongsterrTabs }>();
  const [loading, setLoading] = React.useState(true);
  const styles = useStyles();
  React.useEffect(() => {
    const fetchTabs = async () => {
      const { data } = await axios.post(`/api/songs/tabs`, {
        title: name,
        artist: artists[0].name,
      });

      setTabs(data);

      setLoading(false);
    };
    fetchTabs();
  }, []);

  const haveTabs = (() => !!(tabs && !!tabs.song.length))();

  return (
    <ListItem
      button={!loading && haveTabs ? undefined : false}
      divider
      className={!loading && haveTabs ? styles.rootSuccess : ''}
    >
      {avatarChildren}
      <ListItemText>
        <SongTitle
          loading={loading}
          tabs={tabs}
          name={name}
          haveTabs={haveTabs}
        />
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

SongBar.defaultProps = {
  avatarChildren: undefined,
};

export default SongBar;
