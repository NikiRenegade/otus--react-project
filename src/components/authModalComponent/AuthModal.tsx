import React from 'react';
import { Modal } from '../modalComponent/Modal';
import { LoginForm } from '../../features/forms/LoginForm/LoginForm';
import { RegisterForm } from '../../features/forms/RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { signupRequest } from '../../store/slices/registerSlice';
import { AppDispatch, State } from '../../store/index';
import { useSignupMutation } from '../../store/api';
type AuthMode = 'login' | 'register';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { error } = useSelector((state: State) => state.register);
  const [signup] = useSignupMutation();
  const handleLogin = (data: { email: string; password: string }) => {
    dispatch(login(data));
    onClose();
  };
  const handleRegisterSaga = (data: { email: string; password: string }) => {
    dispatch(
      signupRequest({
        ...data,
        commandId: 'default-command',
      })
    );
  };
  const handleRegisterRTKQ = async (data: { email: string; password: string }) => {
    try {
      const result = await signup({ ...data, commandId: 'default-command' }).unwrap();
      localStorage.setItem('token', result.token);

      console.log('Профиль:', result.profile);
      alert('Регистрация успешна!');
      onClose();
    } catch (err: any) {
      switch (err?.data?.errors[0].name) {
        case 'ValidationError':
          setErrorMessage('Ошибка валидации');
          break;
        case 'AccountAlreadyExistError':
          setErrorMessage('Пользователь с таким email уже существует');
          break;
        case 'InternalServerError':
          setErrorMessage('Внутренняя ошибка сервера');
          break;
        default:
          setErrorMessage(err.errors[0].message);
      }
      console.log(errorMessage);
    }
  };
  return (
    <Modal visible onClose={onClose} size="sm">
      {mode === 'login' ? (
        <LoginForm onSwitch={() => onSwitch('register')} onSubmit={handleLogin} />
      ) : (
        <>
          <RegisterForm onSubmit={handleRegisterRTKQ} onSwitch={() => onSwitch('login')} />
          {(errorMessage || error) && <p style={{ color: 'red' }}>{errorMessage || error}</p>}
        </>
      )}
    </Modal>
  );
};
