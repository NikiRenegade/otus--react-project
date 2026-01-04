import React, { useContext } from 'react';
import { Modal } from '../modalComponent/Modal';
import { LoginForm } from '../../features/forms/LoginForm/LoginForm';
import { RegisterForm } from '../../features/forms/RegisterForm/RegisterForm';
import { users } from '../../entities/User';
import { AuthContext } from '../../contexts/AuthContext';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (mode: AuthMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitch }) => {
  const { login } = useContext(AuthContext);

  const handleLogin = (data: { email: string; password: string }) => {
    const user = users.find((u) => u.email === data.email && u.password === data.password);

    if (!user) {
      return;
    }

    login(user);
    onClose();
  };
  const handleRegister = (data: { email: string; password: string }) => {
    console.log('регистрация', data);
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
