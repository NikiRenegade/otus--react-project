import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ChangePasswordForm.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordValues) => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles['change-password-form']} ${styles[theme]}`}>
      <h2>
        {t('edit')} {t('password_low')}
      </h2>

      <div className={styles['change-password-form__item']}>
        <label>
          {t('old_cap')} {t('password_low')}
        </label>
        <input
          type="password"
          {...register('currentPassword', {
            required: `${t('enter')} ${t('old_low')} ${t('password_low')}`,
          })}
        />
        {errors.currentPassword && <span className={styles['error-message']}>{errors.currentPassword.message}</span>}
      </div>

      <div className={styles['change-password-form__item']}>
        <label>
          {t('new_cap')} {t('password_low')}
        </label>
        <input
          type="password"
          {...register('newPassword', {
            required: `${t('enter')} ${t('new_low')} ${t('password_low')}`,
          })}
        />
        {errors.newPassword && <span className={styles['error-message']}>{errors.newPassword.message}</span>}
      </div>

      <button type="submit" className={styles['profile-form__submit']}>
        {t('save')}
      </button>
    </form>
  );
};
