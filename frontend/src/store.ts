import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer, { ILoginState } from './reducers/spotifyAuthReducer';
import { getUserFromLocalStorage } from './utils/setLocalStorage';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const localStorageUser = getUserFromLocalStorage();

const storageUser: ILoginState['user'] = localStorageUser;

const rootReducer = {
  spotifyAuth: userLoginReducer,
};

interface IPreloadedState {
  spotifyAuth: ILoginState | undefined;
}

const preloadedState: IPreloadedState = {
  spotifyAuth: { user: storageUser },
};

const store = configureStore({ reducer: rootReducer, preloadedState });

export default store;
