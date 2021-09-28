/* eslint-disable no-console */
import {
  Button,
  Grid,
  Link,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MyTheme } from '../components/SongsBar';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

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
      height: '100%',
    },
  })
);

const UserAlbumsScreen = () => {
  const [albums, setAlbums] = React.useState<SpotifyApi.SavedAlbumObject[]>();

  const classes = useStyles();

  useEffect(() => {
    const fetchUserAlbums = async () => {
      const tokenFromStorage = getTokenFromLocalStorage();
      try {
        const {
          data: { data },
        } = await axios.post('/api/user-library/albums', {
          tokenFromStorage,
        });
        console.log('album użytkownika', data);
        setAlbums(data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserAlbums();
  }, []);

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
                      <Typography>
                        {album.tracks.items.length} trakcs
                      </Typography>
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
