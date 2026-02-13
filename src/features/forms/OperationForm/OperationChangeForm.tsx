import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Operation } from '../../../entities/Operation';
import { Category } from '../../../entities/Category';
import styles from './OperationChangeForm.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery } from 'src/store/api';

export interface OperationChangeFormValues {
  name: string;
  desc?: string;
  amount: number;
  createdAt: Date;
  categoryId: string;
}

export const OperationChangeForm: React.FC<{
  initial?: Operation;
  onSave: (op: OperationChangeFormValues) => void;
}> = ({ initial, onSave }) => {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OperationChangeFormValues>({
    defaultValues: initial
      ? {
          name: initial.name,
          desc: initial.desc || '',
          amount: initial.amount,
          categoryId: initial.category.id,
        }
      : {
          name: '',
          desc: '',
          amount: 0,
          categoryId: '',
        },
  });
  const { t } = useTranslation();
  const submit = (data: OperationChangeFormValues) => {
    onSave(data);
  };
  const { data, isLoading } = useGetCategoriesQuery();
  const categories: Category[] = data?.data ?? [];
  console.log(categories);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${styles['operation-form']} ${theme === 'dark' ? styles.dark : ''}`}
    >
      <div className={styles['operation-form__item']}>
        <label>{t('operation_name_cap')}*</label>
        <input
          {...register('name', { required: `${t('enter')} ${t('operation_name_low')}` })}
          placeholder={`${t('enter')} ${t('operation_name_low')}`}
        />
        {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}
      </div>

      <div className={styles['operation-form__item']}>
        <label>{t('operation_description_cap')}</label>
        <textarea
          {...register('desc', { maxLength: { value: 500, message: `${t('maximum_500_characters')}` } })}
          placeholder={`${t('enter')} ${t('operation_description_low')}`}
        />
        {errors.desc && <span className={styles['error-message']}>{errors.desc.message}</span>}
      </div>

      <div className={styles['operation-form__grid']}>
        <div className={styles['operation-form__item-small']}>
          <label>{t('operation_amount_cap')};</label>
          <input
            type="number"
            {...register('amount', {
              required: `${t('enter')} ${t('operation_amount_low')}`,
              valueAsNumber: true,
              validate: (v) => v > 0 || v < 0 || `${t('enter_amount_other_than_0')}`,
            })}
            placeholder="0.00"
          />
          {errors.amount && <span className={styles['error-message']}>{errors.amount.message}</span>}
        </div>

        <div className={styles['operation-form__item-small']}>
          <label>{t('operation_category_cap')}*</label>
          {!isLoading ? (
            <select
              {...register('categoryId', {
                required: `${t('select')} ${t('operation_category_low')}`,
              })}
            >
              <option value="">
                -- {t('select')} {t('operation_category_low')} --
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </div>

      <button type="submit" className={styles['operation-form__submit']}>
        {initial ? `${t('save_changes')}` : `${t('create_operation')}`}
      </button>
    </form>
  );
};
