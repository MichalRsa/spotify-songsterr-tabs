import { AnyAction, Reducer } from 'redux';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../constants/spotifySearchConstants';

export interface ISearch {
  search?: SpotifyApi.SearchResponse;
  loading?: boolean;
  error?: string;
}

const spotifySearchReducer: Reducer<ISearch, AnyAction> = (
  state = { loading: false, search: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { loading: true, search: undefined, error: undefined };
    case SEARCH_SUCCESS:
      return { loading: false, search: action.payload, error: undefined };
    case SEARCH_FAIL:
      return { loading: false, search: undefined, error: action.payload };
    default:
      return state;
  }
};

export default spotifySearchReducer;
