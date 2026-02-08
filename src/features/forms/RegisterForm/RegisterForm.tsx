import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './RegisterForm.module.scss';
import { useTranslation } from 'react-i18next';

interface RegisterValues {
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSwitch: () => void;
  onSubmit: (values: RegisterValues) => void;
}
export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch, onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ defaultValues: { email: '', password: '' } });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}  ${styles[theme]}`}>
      <h2>{t('register')}</h2>

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

      <button type="submit">{t('register')}</button>

      <p className={styles.switch} onClick={onSwitch}>
        {t('login')}
      </p>
    </form>
  );
};
