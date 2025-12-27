import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './RegisterForm.module.scss';

interface RegisterValues {
  email: string;
  password: string;
  repeat: string;
}

export const RegisterForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit = (data: RegisterValues) => {
    console.log('Регистрация:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}  ${styles[theme]}`}>
      <h2>Регистрация</h2>

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

      <button type="submit">Зарегистрироваться</button>

      <p className={styles.switch} onClick={onSwitch}>
        Вход
      </p>
    </form>
  );
};
