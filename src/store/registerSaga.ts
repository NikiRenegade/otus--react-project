import { call, put, takeLatest } from 'redux-saga/effects';
import { signupRequest, signupFailure } from './slices/registerSlice';

function signupApi(body: { email: string; password: string; commandId: string }) {
  console.log(body);
  return fetch('http://19429ba06ff2.vps.myjino.ru/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((res) => res.json().then((data) => ({ status: res.status, data })));
}

function* signupSaga(action: ReturnType<typeof signupRequest>) {
  try {
    const { status, data } = yield call(signupApi, action.payload);

    if (status === 200) {
      alert('Регистрация успешна');
      localStorage.setItem('token', data?.token);
      return;
    }
    console.log(data);
    let message;

    switch (data?.errors[0].name) {
      case 'ValidationError':
        message = 'Ошибка валидации';
        break;
      case 'AccountAlreadyExistError':
        message = 'Пользователь с таким email уже существует';
        break;
      case 'InternalServerError':
        message = 'Внутренняя ошибка сервера';
        break;
      default:
        message = data.errors[0].message;
    }

    yield put(signupFailure(message));
  } catch (e) {
    yield put(signupFailure('Сервер недоступен'));
  }
}

export function* watchSignup() {
  yield takeLatest(signupRequest.type, signupSaga);
}
