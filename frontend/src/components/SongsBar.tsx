/* eslint-disable no-console */
import * as React from 'react';
import {
  Avatar,
  Link,
  //   IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { InewTuning, IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';
import { Track } from '../screens/Main/interfaces/index';

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
  //   const [haveTabs, setHaveTabs] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const styles = useStyles();
  React.useEffect(() => {
    const fetchTabs = async () => {
      const { data } = await axios.post(`api/songs/tabs`, {
        title: name,
        artist: artists[0].name,
      });

      setTabs(data);
    };
    fetchTabs();
    setLoading(false);
  }, []);
  console.log(tabs);

  const haveTabs = (): any => tabs && !!tabs.song.length;
  // {
  //   if (tabs && !!tabs.song.length) {
  //     return `${styles.rootSuccess}`;
  //   }
  //   if (tabs && !tabs.song.length) return `${styles.rootFail}`;
  //   return null;
  // };

  const showTuning = () => {
    if (tabs && tabs.song.length) {
      if (
        (tabs.song[0].tracks[tabs.song[0].defaultTrack].tuning as InewTuning)
          .name === ''
      )
        return (
          tabs.song[0].tracks[tabs.song[0].defaultTrack].tuning as InewTuning
        ).notes;
      return (
        tabs.song[0].tracks[tabs.song[0].defaultTrack].tuning as InewTuning
      ).name;
    }
    return '';
  };

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
        <Typography variant='h6'>{name}</Typography>
        <Typography component='span'>
          {artists[0].name} - <Link href={album.name}>{album.name}</Link>
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <p>
          {haveTabs() && 'tuning: '}
          {/* {tabs &&
            tabs.song.length &&
            (
              tabs.song[0].tracks[tabs.song[0].defaultTrack]
                .tuning as InewTuning
            ).name} */}
          {showTuning()}
        </p>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SongBar;
