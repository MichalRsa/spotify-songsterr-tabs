/* eslint-disable no-console */
import * as React from 'react';
import {
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';
import SongBarTuning from './SongsBarTuning';
import SongAvatar from './SongAvatar';
import SongTitle from './SongTitle';
import SongArtist from './SongBarArtist';
import SongAlbum from './SongAlbum';
import { Track } from '../../typings';

export interface MyTheme {
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
  song: { name, artists },
  avatarChild,
  artistChild,
  albumChild,
}: {
  song: Track;
  avatarChild?: React.ReactElement<typeof SongAvatar>;
  artistChild?: React.ReactElement<typeof SongArtist>;
  albumChild?: React.ReactElement<typeof SongAlbum>;
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
      {avatarChild}
      <ListItemText>
        <SongTitle
          loading={loading}
          tabs={tabs}
          name={name}
          haveTabs={haveTabs}
        />
        <Typography component='span'>
          {artistChild}
          {/* <Link component={RouterLink} to={`/artists/${artists[0].id}`}>
            {artists[0].name}
          </Link> */}
          {artistChild && albumChild && <span> - </span>}
          {/* <Link component={RouterLink} to={`/albums/${album.id}`}>
            {album.name}
          </Link> */}
          {albumChild}
        </Typography>
      </ListItemText>
      <SongBarTuning tabs={tabs} loading={loading} />
    </ListItem>
  );
};

SongBar.defaultProps = {
  avatarChild: undefined,
  artistChild: undefined,
  albumChild: undefined,
};

export default SongBar;
