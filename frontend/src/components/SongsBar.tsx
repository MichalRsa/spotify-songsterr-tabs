/* eslint-disable no-console */
import * as React from 'react';
import {
  Hidden,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';
import SongBarTuning from './SongsBarTuning';
import SongAvatar from './SongAvatar';
import SongTitle from './SongTitle';
import SongArtist from './SongBarArtist';
import SongAlbum from './SongAlbum';
import { Track } from '../../typings/declaration';

export interface MyTheme {
  palette: { success: { main: string }; error: { main: string } };
}

const useStyles = makeStyles((theme: Theme) => ({
  rootSuccess: {
    backgroundColor: theme.palette.secondary.main,
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
  song: SpotifyApi.TrackObjectSimplified | Track;
  avatarChild?: React.ReactElement<typeof SongAvatar>;
  artistChild?: React.ReactElement<typeof SongArtist>;
  albumChild?: React.ReactElement<typeof SongAlbum>;
}) => {
  const [tabs, setTabs] = React.useState<{ song: IsongsterrTabs }>();
  const [loading, setLoading] = React.useState(true);
  const styles = useStyles();

  React.useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchTabs = async () => {
      try {
        const { data } = await axios.post(
          `/api/songs/tabs`,
          {
            title: name,
            artist: artists[0].name,
          },
          {
            cancelToken: source.token,
          }
        );

        setTabs(data);

        setLoading(false);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchTabs();
    return () => source.cancel();
  }, []);

  const haveTabs = (() => !!(tabs && !!tabs.song.length))();

  return (
    <ListItem
      button={!loading && haveTabs ? undefined : false}
      divider
      className={!loading && haveTabs ? styles.rootSuccess : ''}
    >
      {avatarChild && <Hidden xsDown>{avatarChild}</Hidden>}
      <ListItemText>
        <SongTitle
          loading={loading}
          tabs={tabs}
          name={name}
          haveTabs={haveTabs}
        />
        <Typography component='span'>
          {artistChild}
          {artistChild && albumChild && <span> - </span>}
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
