import * as React from 'react';
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
  Theme,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import SongBar from './SongsBar';

interface AlbumCardProps {
  album: SpotifyApi.AlbumObjectFull;
}

const useStyles = makeStyles((theme: Theme) =>
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
      maxWidth: '100%',
      display: 'block',
    },
    container: {
      '&&': {
        position: 'relative',
        paddingTop: '0px',
        paddingBottom: '0px',
        [theme.breakpoints.down('sm')]: {
          paddingRight: '0',
        },
      },
    },
    textCont: {
      height: '100%',
    },
  })
);

const AlbumCard = ({ album }: AlbumCardProps) => {
  const songs = album.tracks.items;
  const [showSongs, setShowSongs] = React.useState(false);

  const classes = useStyles();

  return (
    <>
      <Paper>
        <Grid className={classes.albumHeader} container spacing={10}>
          <Grid
            item
            xs={4}
            classes={{
              item: classes.container,
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
                  <Typography>{album.tracks.items.length} trakcs</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant='outlined'
                    onClick={() => setShowSongs(!showSongs)}
                  >
                    {!showSongs ? 'Tabs' : 'Hide'}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        {showSongs && songs.map((song) => <SongBar song={song} />)}
      </Paper>
    </>
  );
};
export default AlbumCard;
