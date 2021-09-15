import axios from 'axios';
import { Dispatch } from 'react';
import {
  USER_SPOTIFY_AUTH_FAIL,
  USER_SPOTIFY_AUTH_REQUEST,
  USER_SPOTIFY_AUTH_SUCCESS,
} from '../constants/userConstants';
import { setTokenInLocalStorage } from '../utils/setLocalStorage';

const fetchToken =
  (user: any, body: object) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: USER_SPOTIFY_AUTH_REQUEST });
    //     if (!user)
    try {
      const { data } = await axios.post(`/api/user/auth`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setTokenInLocalStorage(data.refresh_token);
      dispatch({ type: USER_SPOTIFY_AUTH_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: USER_SPOTIFY_AUTH_FAIL, payload: err });
    }
  };

export default fetchToken;
