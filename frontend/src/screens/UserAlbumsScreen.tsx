/* eslint-disable no-console */
import {
  Button,
  Grid,
  Link,
  Paper,
  Typography,
  //   ListItemIcon,
  makeStyles,
  //   Paper,
  //   Typography,
  //   createStyles,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
// import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { MyTheme } from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';
import { Album } from './Main/interfaces';

const useStyles = makeStyles((theme: MyTheme) =>
  //   createStyles
  ({
    rootSuccess: {
      backgroundColor: theme.palette.success.main,
    },
    rootFail: {
      backgroundColor: theme.palette.error.main,
    },
    albumHeader: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    img: {
      width: '100%',
      display: 'block',
    },
    spacing: {
      '&&': {
        paddingTop: '0px',
        paddingBottom: '0px',
      },
    },
    textCont: {
      //       backgroundColor: 'blue',
      height: '100%',
    },
  })
);

const UserAlbumsScreen = () => {
  //   const [songs, setSongs] = React.useState<ISongs>();
  const [albums, setAlbums] =
    React.useState<{ album: Album; added_at: string }[]>();

  const classes = useStyles();
  //   const history = useHistory();

  useEffect(() => {
    const fetchUserAlbums = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { data },
        } = await axios.post('/api/user-library/albums', {
          tokenFromStorage,
        });
        setAlbums(data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserAlbums();
  });

  return (
    <>
      {albums &&
        albums.map(({ album }) => (
          <Paper>
            <Grid className={classes.albumHeader} container spacing={10}>
              <Grid
                item
                xs={4}
                classes={{
                  item: classes.spacing,
                }}
              >
                <img
                  src={album?.images[1].url}
                  alt={album.name}
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={8}>
                {album && (
                  <Grid
                    container
                    direction='column'
                    justifyContent='space-between'
                    className={classes.textCont}
                  >
                    <Grid item>
                      <Typography component='h2'>
                        {`${album?.name} by `}
                        <Link
                          component={RouterLink}
                          to={`/artists/${album.artists[0].id}`}
                        >
                          {album?.artists[0].name}
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{album.total_tracks} trakcs</Typography>
                    </Grid>
                    <Grid item>
                      <Button variant='outlined'>Tabs</Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))}
    </>
  );
};

export default UserAlbumsScreen;
