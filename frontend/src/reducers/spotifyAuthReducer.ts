import { Reducer } from 'react';
import { AnyAction } from 'redux';
import {
  USER_SPOTIFY_AUTH_FAIL,
  USER_SPOTIFY_AUTH_LOGOUT,
  USER_SPOTIFY_AUTH_REQUEST,
  USER_SPOTIFY_AUTH_SUCCESS,
} from '../constants/userConstants';

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  timestamps: boolean;
}
export interface ILoginState {
  loading?: boolean;
  userInfo?: UserInfo;
  error?: string;
}
const userLoginReducer: Reducer<ILoginState | undefined, AnyAction> = (
  state = { loading: true, userInfo: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case USER_SPOTIFY_AUTH_REQUEST:
      return { loading: true, userInfo: undefined, error: undefined };
    case USER_SPOTIFY_AUTH_SUCCESS:
      return { loading: false, userInfo: action.payload, error: undefined };
    case USER_SPOTIFY_AUTH_FAIL:
      return { loading: false, userInfo: undefined, error: action.payload };
    case USER_SPOTIFY_AUTH_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userLoginReducer;
