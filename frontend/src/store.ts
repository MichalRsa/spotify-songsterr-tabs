import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer from './reducers/spotifyAuthReducer';

const rootReducer = {
  SpotifyAuth: userLoginReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
