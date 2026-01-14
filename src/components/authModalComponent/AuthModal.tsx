import React from 'react';
import { Modal } from '../modalComponent/Modal';
import { LoginForm } from '../../features/forms/LoginForm/LoginForm';
import { RegisterForm } from '../../features/forms/RegisterForm/RegisterForm';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store/index';
type AuthMode = 'login' | 'register';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = (data: { email: string; password: string }) => {
    dispatch(login(data));
    onClose();
  };
  const handleRegister = (data: { email: string; password: string }) => {
    onClose();
  };

  return (
    <Modal visible onClose={onClose} size="sm">
      {mode === 'login' ? (
        <LoginForm onSwitch={() => onSwitch('register')} onSubmit={handleLogin} />
      ) : (
        <RegisterForm
          onSubmit={() => {
            handleRegister;
          }}
          onSwitch={() => onSwitch('login')}
        />
      )}
    </Modal>
  );
};
