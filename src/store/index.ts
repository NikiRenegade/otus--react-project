import { configureStore } from '@reduxjs/toolkit';
import authreducer from './slices/authSlice';
import appreducer from './slices/appSlice';
import operationsreducer from './slices/operationsSlice';
import registerreducer from './slices/registerSlice';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import { api } from './api';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    app: appreducer,
    auth: authreducer,
    operations: operationsreducer,
    register: registerreducer,
    api: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, api.middleware),
});
sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
