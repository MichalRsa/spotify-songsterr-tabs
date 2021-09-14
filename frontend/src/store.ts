import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer from './reducers/spotifyAuthReducer';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = {
  spotifyAuth: userLoginReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
