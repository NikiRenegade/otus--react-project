import React from 'react';
import { Modal } from '../modalComponent/Modal';
import { LoginForm } from '../../features/forms/LoginForm/LoginForm';
import { RegisterForm } from '../../features/forms/RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { AppDispatch, State } from '../../store/index';
import { useSignupMutation, useSigninMutation } from '../../store/api';
import { useTranslation } from 'react-i18next';
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
  const [signin] = useSigninMutation();
  const { t } = useTranslation();
  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      const result = await signup({ ...data, commandId: 'default-command' }).unwrap();
      dispatch(login({ token: result.token }));
      alert(`${t('registration_successful')}`);
      onClose();
    } catch (err: any) {
      switch (err?.data?.errors[0].name) {
        case 'AccountAlreadyExistError':
          setErrorMessage(`${t('account_already_exist_error')}`);
          break;
        case 'ValidationError':
          setErrorMessage(`${t('validation_error')}`);
          break;
        case 'InternalServerError':
          setErrorMessage(`${t('internal_server_error')}`);
          break;
        default:
          setErrorMessage(err?.data?.errors[0].message);
      }
      console.log(errorMessage);
    }
  };
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const result = await signin(data).unwrap();
      dispatch(login({ token: result.token }));
      alert(`${t('login_successful')}`);
      onClose();
    } catch (err: any) {
      switch (err?.data?.errors[0]?.name) {
        case 'IncorrectEmailOrPasswordError':
          setErrorMessage(`${t('incorrect_email_or_password_error')}`);
          break;
        case 'ValidationError':
          setErrorMessage(`${t('validation_error')}`);
          break;
        case 'InternalServerError':
          setErrorMessage(`${t('internal_server_error')}`);
          break;
        default:
          setErrorMessage(err?.data?.errors[0]?.message);
      }
      console.log(errorMessage);
    }
  };
  return (
    <Modal visible onClose={onClose} size="sm">
      {mode === 'login' ? (
        <>
          <LoginForm onSwitch={() => onSwitch('register')} onSubmit={handleLogin} />
          {(errorMessage || error) && <p style={{ color: 'red' }}>{errorMessage || error}</p>}
        </>
      ) : (
        <>
          <RegisterForm onSubmit={handleRegister} onSwitch={() => onSwitch('login')} />
          {(errorMessage || error) && <p style={{ color: 'red' }}>{errorMessage || error}</p>}
        </>
      )}
    </Modal>
  );
};
