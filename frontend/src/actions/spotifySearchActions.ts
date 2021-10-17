import axios from 'axios';
import { Dispatch } from 'redux';
import {
  SEARCH_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from '../constants/spotifySearchConstants';
import { getTokenFromLocalStorage } from '../utils/setLocalStorage';

const spotifySearch = (string: string) => async (dispatch: Dispatch) => {
  dispatch({ type: SEARCH_REQUEST });
  try {
    const tokenFromStorage = getTokenFromLocalStorage();
    const inputValue = string;
    const { data } = await axios.post('/api/songs/search', {
      tokenFromStorage,
      inputValue,
    });

    dispatch({ type: SEARCH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: SEARCH_FAIL, payload: err });
  }
};

export default spotifySearch;
