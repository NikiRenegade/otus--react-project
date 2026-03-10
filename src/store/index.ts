import { configureStore } from '@reduxjs/toolkit';
import authreducer from './slices/authSlice';
import appreducer from './slices/appSlice';
import createSagaMiddleware from 'redux-saga';
import { api } from './api';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    app: appreducer,
    auth: authreducer,
    api: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, api.middleware),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
