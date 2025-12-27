import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './LoginForm.module.scss';

interface LoginValues {
  email: string;
  password: string;
}

export const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit = (data: LoginValues) => {
    console.log('Вход:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}  ${styles[theme]}`}>
      <h2>Вход</h2>

      <label>Email*</label>
      <input
        {...register('email', {
          required: 'Введите email',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Введите корректный email',
          },
        })}
        placeholder="example@gmail.com"
      />
      {errors.email && <span className={styles['error-message']}>{errors.email.message}</span>}

      <label>Пароль*</label>
      <input type="password" {...register('password', { required: 'Введите пароль' })} />
      {errors.password && <span className={styles['error-message']}>{errors.password.message}</span>}

      <button type="submit">Войти</button>

      <p className={styles.switch} onClick={onSwitch}>
        Регистрация
      </p>
    </form>
  );
};