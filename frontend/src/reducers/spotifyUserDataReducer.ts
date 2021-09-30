import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { ISongs } from '../../typings';
import {
  ALBUMS_SUCCESS,
  ALBUMS_FAIL,
  ALBUMS_REQUEST,
  RECENT_FAIL,
  RECENT_REQUEST,
  RECENT_SUCCESS,
} from '../constants/spotifyUserDataConstants';

type DataKey = 'recent' | 'albums' | 'favSongs';

export type IUserState<T> = {
  [key in DataKey]?: T;
} & {
  loading?: boolean;
  error?: string;
};

export const spotifyUserRecentReducer: Reducer<
  IUserState<ISongs> | undefined,
  AnyAction
> = (
  state = { loading: true, recent: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case RECENT_REQUEST:
      return { loading: true, recent: undefined, error: undefined };
    case RECENT_SUCCESS:
      return { loading: false, recent: action.payload, error: undefined };
    case RECENT_FAIL:
      return { loading: false, recent: undefined, error: action.payload };
    default:
      return state;
  }
};

export const spotifyUserFavoriteReducer: Reducer<
  IUserState<ISongs> | undefined,
  AnyAction
> = (
  state = { loading: true, favSongs: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case RECENT_REQUEST:
      return { loading: true, favSongs: undefined, error: undefined };
    case RECENT_SUCCESS:
      return { loading: false, favSongs: action.payload, error: undefined };
    case RECENT_FAIL:
      return { loading: false, favSongs: undefined, error: action.payload };
    default:
      return state;
  }
};

export const spotifyUserAlbumsReducer: Reducer<
  IUserState<SpotifyApi.SavedAlbumObject[]> | undefined,
  AnyAction
> = (
  state = { loading: true, albums: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case ALBUMS_REQUEST:
      return { loading: true, albums: undefined, error: undefined };
    case ALBUMS_SUCCESS:
      return { loading: false, albums: action.payload, error: undefined };
    case ALBUMS_FAIL:
      return { loading: false, albums: undefined, error: action.payload };
    default:
      return state;
  }
};
