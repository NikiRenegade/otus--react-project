import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddCategoryForm.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface AddCategoryValues {
  name: string;
}

interface AddCategoryFormProps {
  onSubmit: (data: AddCategoryValues) => void;
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSubmit }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCategoryValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles['add-category-form']} ${styles[theme]}`}>
      <h2>{t('add_category')}</h2>

      <div className={styles['add-category-form__item']}>
        <label>{t('category_name_cap')}</label>
        <input
          {...register('name', {
            required: `${t('enter')} ${t('category_name_low')}`,
          })}
        />
        {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}
      </div>

      <button type="submit" className={styles['profile-form__submit']}>
        {t('create_category')}
      </button>
    </form>
  );
};
