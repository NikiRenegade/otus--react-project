import { all } from 'redux-saga/effects';
import { watchSignup } from './registerSaga';

export default function* rootSaga() {
  yield all([watchSignup()]);
}
