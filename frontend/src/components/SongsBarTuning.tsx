/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { CircularProgress, ListItemSecondaryAction } from '@material-ui/core';
import { InewTuning, IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';

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
  return loading ? (
    <CircularProgress />
  ) : tabs && tabs.song.length ? (
    <ListItemSecondaryAction>
      <p>tuning: {showTuning()}</p>
    </ListItemSecondaryAction>
  ) : null;
};

export default SongBarTuning;
