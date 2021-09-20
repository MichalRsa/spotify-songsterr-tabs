import * as React from 'react';
import { ListItemSecondaryAction } from '@material-ui/core';
import { InewTuning, IsongsterrTabs } from 'songsterr-api-node/dist/interfaces';

interface Itabs {
  song: IsongsterrTabs;
}
const SongBarTuning = ({ tabs }: { tabs: Itabs }) => {
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
    <ListItemSecondaryAction>
      <p>tuning: {showTuning()}</p>
    </ListItemSecondaryAction>
  );
};

export default SongBarTuning;
