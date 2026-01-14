import { configureStore } from '@reduxjs/toolkit';
import authreducer from './slices/authSlice';
import appreducer from './slices/appSlice';
import operationsreducer from './slices/operationsSlice';

export const store = configureStore({
  reducer: {
    app: appreducer,
    auth: authreducer,
    operations: operationsreducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
