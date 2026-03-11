import { notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LoginForm } from '../../features/forms/LoginForm/LoginForm';
import { RegisterForm } from '../../features/forms/RegisterForm/RegisterForm';
import { useSigninMutation, useSignupMutation } from '../../store/api';
import { AppDispatch, State } from '../../store/index';
import { login } from '../../store/slices/authSlice';
import { normalizeApiError } from '../../utils/normalizeApiError';
import { Modal } from '../modalComponent/Modal';
type AuthMode = 'login' | 'register';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [signup] = useSignupMutation();
  const [signin] = useSigninMutation();
  const { t } = useTranslation();
  const handleRegister = async (data: { email: string; password: string }) => {
    try {
      const result = await signup({ ...data, commandId: 'default-command' }).unwrap();
      dispatch(login({ token: result.token }));
      notification.success({ title: t('registration_successful') });
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const { name, message } = normalizeApiError(err);
      switch (name) {
        case 'AccountAlreadyExistError':
          setErrorMessage(t('account_already_exist_error'));
          notification.error({ title: t('account_already_exist_error'), description: message });
          break;
        case 'ValidationError':
          setErrorMessage(t('validation_error'));
          notification.error({ title: t('validation_error'), description: message });
          break;
        case 'InternalServerError':
          setErrorMessage(t('internal_server_error'));
          notification.error({ title: t('internal_server_error'), description: message });
          break;
        default:
          setErrorMessage(message);
          notification.error({ title: message });
      }
    }
  };
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const result = await signin(data).unwrap();
      dispatch(login({ token: result.token }));
      notification.success({ title: t('login_successful') });
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const { name, message } = normalizeApiError(err);
      switch (name) {
        case 'IncorrectEmailOrPasswordError':
          setErrorMessage(t('incorrect_email_or_password_error'));
          notification.error({ title: t('incorrect_email_or_password_error'), description: message });
          break;
        case 'ValidationError':
          setErrorMessage(t('validation_error'));
          notification.error({ title: t('validation_error'), description: message });
          break;
        case 'InternalServerError':
          setErrorMessage(t('internal_server_error'));
          notification.error({ title: t('internal_server_error'), description: message });
          break;
        default:
          setErrorMessage(message);
          notification.error({ title: message });
      }
    }
  };
  return (
    <Modal visible onClose={onClose} size="sm">
      {mode === 'login' ? (
        <>
          <LoginForm onSwitch={() => onSwitch('register')} onSubmit={handleLogin} />
          {(errorMessage) && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      ) : (
        <>
          <RegisterForm onSubmit={handleRegister} onSwitch={() => onSwitch('login')} />
          {(errorMessage) && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      )}
    </Modal>
  );
};
