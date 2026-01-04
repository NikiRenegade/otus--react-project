import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';

interface LoginValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSwitch: () => void;
  onSubmit: (values: LoginValues) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitch, onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ defaultValues: { email: '', password: '' } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}  ${styles[theme]}`}>
      <h2> {t('login')}</h2>

      <label>{t('email_cap')}*</label>
      <input
        {...register('email', {
          required: `${t('enter')} ${t('email_low')}`,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: `${t('enter')} ${t('valid_low')} ${t('email_low')}`,
          },
        })}
        placeholder="example@gmail.com"
      />
      {errors.email && <span className={styles['error-message']}>{errors.email.message}</span>}

      <label>{t('password_cap')}*</label>
      <input type="password" {...register('password', { required: `${t('enter')} ${t('password_low')}` })} />
      {errors.password && <span className={styles['error-message']}>{errors.password.message}</span>}

      <button type="submit">{t('login')}</button>

      <p className={styles.switch} onClick={onSwitch}>
        {t('register')}
      </p>
    </form>
  );
};
