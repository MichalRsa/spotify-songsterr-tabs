import { Reducer } from 'react';
import { AnyAction } from 'redux';
import {
  USER_SPOTIFY_AUTH_FAIL,
  USER_SPOTIFY_AUTH_LOGOUT,
  USER_SPOTIFY_AUTH_REQUEST,
  USER_SPOTIFY_AUTH_SUCCESS,
} from '../constants/userConstants';

export interface UserInfo {
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
  userData?: UserInfo;
  error?: string;
}
const userLoginReducer: Reducer<ILoginState | undefined, AnyAction> = (
  state = { loading: true, userData: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case USER_SPOTIFY_AUTH_REQUEST:
      return { loading: true, userData: undefined, error: undefined };
    case USER_SPOTIFY_AUTH_SUCCESS:
      return { loading: false, userData: action.payload, error: undefined };
    case USER_SPOTIFY_AUTH_FAIL:
      return { loading: false, userData: undefined, error: action.payload };
    case USER_SPOTIFY_AUTH_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userLoginReducer;
