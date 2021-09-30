/* eslint-disable no-console */
import axios from 'axios';
import { Dispatch } from 'redux';
import {
  RECENT_FAIL,
  RECENT_REQUEST,
  RECENT_SUCCESS,
  ALBUMS_REQUEST,
  ALBUMS_SUCCESS,
  ALBUMS_FAIL,
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAIL,
} from '../constants/spotifyUserDataConstants';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

export const fetchRecent = () => async (dispatch: Dispatch) => {
  console.log('fetchRecent running');
  dispatch({ type: RECENT_REQUEST });
  const tokenFromStorage = getTokenFromLocalStorage();
  try {
    const {
      data: { songsData },
    } = await axios.post('/api/user-library/recent', {
      tokenFromStorage,
    });
    dispatch({
      type: RECENT_SUCCESS,
      payload: songsData,
    });
  } catch (err) {
    dispatch({ type: RECENT_FAIL, payload: err });
  }
};

export const fetchUserAlbums = () => async (dispatch: Dispatch) => {
  dispatch({ type: ALBUMS_REQUEST });
  const tokenFromStorage = getTokenFromLocalStorage();
  try {
    const {
      data: { data },
    } = await axios.post('/api/user-library/albums', {
      tokenFromStorage,
    });
    console.log(data.items);
    dispatch({ type: ALBUMS_SUCCESS, payload: data.items });
  } catch (err) {
    dispatch({ type: ALBUMS_FAIL, payload: err });
  }
};

export const fetchFavsSongs = () => async (dispatch: Dispatch) => {
  dispatch({ type: FAVORITE_REQUEST });
  const tokenFromStorage = getTokenFromLocalStorage();
  try {
    const {
      data: { songsData },
    } = await axios.post('/api/user-library/tracks', {
      tokenFromStorage,
    });
    dispatch({ type: FAVORITE_SUCCESS, payload: songsData });
  } catch (err) {
    dispatch({ type: FAVORITE_FAIL, payload: err });
  }
};
