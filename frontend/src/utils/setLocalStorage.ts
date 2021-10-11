import { IUser } from '../reducers/spotifyAuthReducer';

/* eslint-disable @typescript-eslint/naming-convention */
export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem('refresh_token', token);
};

export const getTokenFromLocalStorage = () => {
  const refresh_token = localStorage.getItem('refresh_token');
  return refresh_token;
};

export const removerTokenFromLocalStorage = () => {
  const refresh_token = localStorage.removeItem('refresh_token');
  return refresh_token;
};

export const setUserInLocalStorage = (user: IUser | undefined) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const refresh_token = localStorage.getItem('user');
  return typeof refresh_token === 'string'
    ? JSON.parse(refresh_token)
    : undefined;
};

export const removeUserFromLocalStorage = () => {
  const refresh_token = localStorage.removeItem('user');
  return typeof refresh_token === 'string'
    ? JSON.parse(refresh_token)
    : undefined;
};
