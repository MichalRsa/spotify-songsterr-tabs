import { Reducer } from 'react';
import { AnyAction } from 'redux';
import {
  USER_SPOTIFY_AUTH_FAIL,
  USER_SPOTIFY_AUTH_LOGOUT,
  USER_SPOTIFY_AUTH_REQUEST,
  USER_SPOTIFY_AUTH_SUCCESS,
} from '../constants/userConstants';

export interface IUser {
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      height: null;
      url: string;
      width: null;
    }
  ];
  product: string;
  type: string;
  uristring: string;
}
export interface ILoginState {
  loading?: boolean;
  user?: IUser;
  error?: any;
}
const userLoginReducer: Reducer<ILoginState | undefined, AnyAction> = (
  state = { loading: true, user: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case USER_SPOTIFY_AUTH_REQUEST:
      return { loading: true, user: undefined, error: undefined };
    case USER_SPOTIFY_AUTH_SUCCESS:
      return { loading: false, user: action.payload, error: undefined };
    case USER_SPOTIFY_AUTH_FAIL:
      return { loading: false, user: undefined, error: action.payload };
    case USER_SPOTIFY_AUTH_LOGOUT:
      return { loading: false, user: undefined, error: undefined };
    default:
      return state;
  }
};

export default userLoginReducer;
