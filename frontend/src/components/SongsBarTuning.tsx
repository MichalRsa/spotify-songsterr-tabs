/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  CircularProgress,
  Hidden,
  ListItemSecondaryAction,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import { InewTuning, IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';
// import { CallMissedSharp } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  horizontal: {
    margin: '0',
    '& span': {
      display: 'block',
      lineHeight: 0.9,
    },
  },
  myRoot: { position: 'static', transform: 'translateY(0)' },
}));

interface Itabs {
  song: IsongsterrTabs;
}

const SongBarTuning = ({
  tabs,
  loading,
}: {
  tabs: Itabs | undefined;
  loading: boolean;
}) => {
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(420)
  );

  const classes = useStyles();

  const showTuning = () => {
    if (tabs && tabs.song.length) {
      return (
        tabs.song[0].tracks[tabs.song[0].defaultTrack].tuning as InewTuning
      )?.notes;
    }
    return '';
  };

  const showTuningHorizontal = () => {
    const tuning = showTuning();

    const tunningLetters = tuning?.split(' ');

    return tunningLetters?.map((letter, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index}>{letter}</span>
    ));
  };

  return loading ? (
    <CircularProgress />
  ) : tabs && tabs.song.length ? (
    <ListItemSecondaryAction classes={{ root: classes.myRoot }}>
      <p className={smallScreen ? classes.horizontal : ''}>
        <Hidden xsDown>tuning: </Hidden>
        {!smallScreen ? showTuning() : showTuningHorizontal()}
      </p>
    </ListItemSecondaryAction>
  ) : null;
};

export default SongBarTuning;
