import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ProfileForm.module.scss';
import { ProfileFormValues } from './ProfileFormValues';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const ProfileForm: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    defaultValues: { name: '', email: '', about: '' },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log('Форма отправлена:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles['profile-form']} ${styles[theme]}`}>
      <div className={styles['profile-form__item']}>
        <label>Имя*</label>
        <input {...register('name', { required: 'Введите имя' })} placeholder="Ваше имя" />
        {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}
      </div>

      <div className={styles['profile-form__item']}>
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
      </div>

      <div className={styles['profile-form__item']}>
        <label>О себе</label>
        <textarea
          {...register('about', {
            maxLength: { value: 200, message: 'Максимум 200 символов' },
          })}
          placeholder="Расскажите о себе"
        />
        {errors.about && <span className={styles['error-message']}>{errors.about.message}</span>}
      </div>

      <button type="submit" className={styles['profile-form__submit']}>
        Сохранить
      </button>
    </form>
  );
};