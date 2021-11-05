import axios from 'axios';
import { Dispatch } from 'react';
import {
  USER_SPOTIFY_AUTH_FAIL,
  USER_SPOTIFY_AUTH_LOGOUT,
  USER_SPOTIFY_AUTH_REQUEST,
  USER_SPOTIFY_AUTH_SUCCESS,
} from '../constants/userConstants';
import {
  removerTokenFromLocalStorage,
  removeUserFromLocalStorage,
  setTokenInLocalStorage,
  setUserInLocalStorage,
} from '../utils/setLocalStorage';

export const fetchToken = (body: object) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: USER_SPOTIFY_AUTH_REQUEST });
  try {
    const { data } = await axios.post(`/api/user/auth`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setTokenInLocalStorage(data.refresh_token);
    setUserInLocalStorage(data.userData);
    dispatch({ type: USER_SPOTIFY_AUTH_SUCCESS, payload: data.userData });
  } catch (err) {
    dispatch({ type: USER_SPOTIFY_AUTH_FAIL, payload: err });
  }
};

export const userLogout = (history: any) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: USER_SPOTIFY_AUTH_REQUEST });

  removerTokenFromLocalStorage();
  removeUserFromLocalStorage();

  history.push('/');

  dispatch({ type: USER_SPOTIFY_AUTH_LOGOUT });
};

export const fetchTestToken = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: USER_SPOTIFY_AUTH_REQUEST });
  try {
    const { data } = await axios.post(`/api/user/test-user`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setTokenInLocalStorage(data.refresh_token);
    setUserInLocalStorage(data.userData);
    dispatch({ type: USER_SPOTIFY_AUTH_SUCCESS, payload: data.userData });
  } catch (err) {
    dispatch({ type: USER_SPOTIFY_AUTH_FAIL, payload: err });
  }
};
