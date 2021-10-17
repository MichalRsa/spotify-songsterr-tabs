import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer, { ILoginState } from './reducers/spotifyAuthReducer';
import spotifySearchReducer, { ISearch } from './reducers/spotifySearchReducer';
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
  spotifySearch: spotifySearchReducer,
};

interface IPreloadedState {
  spotifyAuth: ILoginState | undefined;
  userRecent: IUserState<SpotifyApi.MultipleTracksResponse> | undefined;
  userFavorite: IUserState<SpotifyApi.UsersSavedTracksResponse> | undefined;
  userAlbums: IUserState<SpotifyApi.UsersSavedAlbumsResponse> | undefined;
  spotifySearch: ISearch | undefined;
}

const preloadedState: IPreloadedState = {
  spotifyAuth: { user: storageUser },
  userRecent: undefined,
  userAlbums: undefined,
  userFavorite: undefined,
  spotifySearch: undefined,
};

const store = configureStore({ reducer: rootReducer, preloadedState });

export default store;
