import React, { useState } from 'react';
import { LoginForm } from '../../features/forms/LoginForm/LoginForm';
import { RegisterForm } from '../../features/forms/RegisterForm/RegisterForm';
import { users } from 'src/entities/User';

export const AuthPage: React.FC = () => {
  const [page, setPage] = useState<'login' | 'register'>('login');
  const handleLogin = (data: { email: string; password: string }) => {
    const user = users.find((u) => u.email === data.email && u.password === data.password);

    if (!user) {
      return;
    }
    console.log(user);
  };
  const handleRegister = (data: { email: string; password: string }) => {
    console.log('регистрация', data);
  };
  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      {page === 'login' ? (
        <LoginForm onSwitch={() => setPage('register')} onSubmit={handleLogin} />
      ) : (
        <RegisterForm onSwitch={() => setPage('login')} onSubmit={handleRegister} />
      )}
    </div>
  );
};
