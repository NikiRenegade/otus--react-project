import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ProfileForm.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ProfileValues {
  name?: string;
  email: string;
}
interface ProfileFormProps {
  onSubmit: (data: ProfileValues) => void;
  profileValues: ProfileValues;
}
export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, profileValues }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileValues>({
    defaultValues: { name: '', email: '' },
  });

  useEffect(() => {
    if (profileValues) {
      reset({
        name: profileValues.name ?? '',
        email: profileValues.email ?? '',
      });
    }
  }, [profileValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles['profile-form']} ${styles[theme]}`}>
      <h2>
        {t('edit')} {t('profile_low')}
      </h2>
      <div className={styles['profile-form__item']}>
        <label>{t('name_cap')}*</label>
        <input {...register('name', { required: `${t('enter')} ${t('name_low')}` })} placeholder={t('your_name')} />
        {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}
      </div>

      <div className={styles['profile-form__item']}>
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
      </div>

      <button type="submit" className={styles['profile-form__submit']}>
        {t('save')}
      </button>
    </form>
  );
};
