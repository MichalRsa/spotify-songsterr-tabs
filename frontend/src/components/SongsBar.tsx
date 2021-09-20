/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import * as React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  Avatar,
  Button,
  // Link,
  ListItem,
  ListItemAvatar,
  // ListItemProps,
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

// const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => (
//   <ListItem button component='a' {...props} />
// );

const SongBar = ({ song: { album, name, artists } }: { song: Track }) => {
  const [tabs, setTabs] = React.useState<{ song: IsongsterrTabs }>();
  const [loading, setLoading] = React.useState(true);
  const styles = useStyles();
  const history = useHistory();
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
      component='a'
      href={
        !loading && haveTabs()
          ? `https://www.songsterr.com/a/wsa/${tabs?.song[0].artist}-${
              tabs?.song[0].title
            }-s${tabs?.song[0].songId.toString()}`
          : ''
      }
      button={!loading && haveTabs()}
      divider
      className={!loading && haveTabs() ? styles.rootSuccess : ''}
      // onClick={() => console.log('klik')}
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
          <Button
            onClick={(e) => {
              e.preventDefault();
              history.push(`/artists/${artists[0].id}`);
            }}
          >
            {artists[0].name} -{' '}
          </Button>
          <Button onClick={() => history.push(`/albums/${album.id}`)}>
            {album.name}
          </Button>
        </Typography>
      </ListItemText>
      <SongBarTuning tabs={tabs} loading={loading} />
    </ListItem>
  );
};

export default SongBar;
