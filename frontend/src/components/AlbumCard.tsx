import * as React from 'react';
import {
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
  Theme,
  useMediaQuery,
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
    card: {
      [theme.breakpoints.down(420)]: {
        // width: '260px',
      },
    },
    albumHeader: {
      marginTop: '1rem',
      marginBottom: '1rem',
      [theme.breakpoints.down(420)]: {
        flexDirection: 'column',
      },
    },
    img: {
      maxWidth: '100%',
      display: 'block',
      [theme.breakpoints.down(420)]: {
        // flexDirection: 'column',
        // display: 'inline',
        textAlign: 'center',
        maxWidth: '100%',
        margin: '0 auto',
      },
    },
    imgContainer: {
      '&&': {
        position: 'relative',
        paddingTop: '0px',
        paddingBottom: '0px',
        [theme.breakpoints.down('sm')]: {
          paddingRight: '0',
        },
        [theme.breakpoints.down(420)]: {
          // flexDirection: 'column',
          paddingRight: '40px',
        },
      },
    },
    textCont: {
      height: '100%',
      [theme.breakpoints.down(420)]: {
        textAlign: 'center',
      },
    },
  })
);

const AlbumCard = ({ album }: AlbumCardProps) => {
  const songs = album.tracks.items;
  const [showSongs, setShowSongs] = React.useState(false);

  const classes = useStyles();

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(420)
  );

  return (
    <>
      <Paper className={classes.card}>
        <Grid className={classes.albumHeader} container spacing={10}>
          <Grid
            item
            xs={smallScreen ? 12 : 6}
            sm={4}
            classes={{
              item: classes.imgContainer,
            }}
          >
            <img
              src={album?.images[1].url}
              alt={album.name}
              className={classes.img}
            />
          </Grid>
          <Grid item xs={smallScreen ? 12 : 6} sm={8}>
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
