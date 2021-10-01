import { configureStore } from '@reduxjs/toolkit';
import { ISongs } from '../typings';
import userLoginReducer, { ILoginState } from './reducers/spotifyAuthReducer';
import {
  spotifyUserRecentReducer,
  IUserState,
  spotifyUserAlbumsReducer,
  spotifyUserFavoriteReducer,
} from './reducers/spotifyUserDataReducer';
import { getUserFromLocalStorage } from './utils/setLocalStorage';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const localStorageUser = getUserFromLocalStorage();

const storageUser: ILoginState['user'] = localStorageUser;

const rootReducer = {
  spotifyAuth: userLoginReducer,
  userRecent: spotifyUserRecentReducer,
  userFavorite: spotifyUserFavoriteReducer,
  userAlbums: spotifyUserAlbumsReducer,
};

interface IPreloadedState {
  spotifyAuth: ILoginState | undefined;
  userRecent: IUserState<ISongs> | undefined;
  userFavorite: IUserState<ISongs> | undefined;
  userAlbums: IUserState<SpotifyApi.UsersSavedAlbumsResponse> | undefined;
}

const preloadedState: IPreloadedState = {
  spotifyAuth: { user: storageUser },
  userRecent: undefined,
  userAlbums: undefined,
  userFavorite: undefined,
};

const store = configureStore({ reducer: rootReducer, preloadedState });

export default store;
