import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ProfileForm.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ProfileValues {
  name?: string;
  email: string;
  phone?: string;
  description?: string;
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
    defaultValues: { name: '', email: '', phone: '', description: '' },
  });

  useEffect(() => {
    if (profileValues) {
      reset({
        name: profileValues.name ?? '',
        email: profileValues.email ?? '',
        phone: profileValues.phone ?? '',
        description: profileValues.description ?? '',
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

      <div className={styles['profile-form__item']}>
        <label>{t('phone_number_cap')}</label>
        <input
          {...register('phone', {
            required: `${t('enter')} ${t('phone_number_low')}`,
            pattern: {
              value: /^\+?[0-9\s\-()]{7,20}$/,
              message: `${t('enter')} ${t('valid_low')} ${t('phone_number_low')}`,
            },
          })}
          placeholder="example@gmail.com"
        />
        {errors.email && <span className={styles['error-message']}>{errors.email.message}</span>}
      </div>

      <div className={styles['profile-form__item']}>
        <label>{t('about_myself_cap')}</label>
        <textarea
          {...register('description', {
            maxLength: { value: 200, message: `${t('maximum_200_characters')}` },
          })}
          placeholder={t('tell_us_about_yourself')}
        />
        {errors.description && <span className={styles['error-message']}>{errors.description.message}</span>}
      </div>

      <button type="submit" className={styles['profile-form__submit']}>
        {t('save')}
      </button>
    </form>
  );
};
