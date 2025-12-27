import React, { useState } from 'react';
import { LoginForm } from '../../features/forms/LoginForm/LoginForm';
import { RegisterForm } from '../../features/forms/RegisterForm/RegisterForm';

export const AuthScreen: React.FC = () => {
  const [page, setPage] = useState<'login' | 'register'>('login');

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      {page === 'login' ? (
        <LoginForm onSwitch={() => setPage('register')} />
      ) : (
        <RegisterForm onSwitch={() => setPage('login')} />
      )}
    </div>
  );
};