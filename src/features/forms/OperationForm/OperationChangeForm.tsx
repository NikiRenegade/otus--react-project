import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Operation } from '../../../entities/Operation';
import { Category, categories } from '../../../entities/Category';
import styles from './OperationChangeForm.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export interface OperationChangeFormValues {
  title: string;
  description?: string;
  amount: number;
  categoryId: string;
  category: Category;
}

export const OperationChangeForm: React.FC<{ initial?: Operation; onSave: (op: Operation) => void }> = ({
  initial,
  onSave,
}) => {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OperationChangeFormValues>({
    defaultValues: initial
      ? {
          title: initial.title,
          description: initial.description || '',
          amount: initial.amount,
          categoryId: initial.categoryId,
        }
      : {
          title: '',
          description: '',
          amount: 0,
          categoryId: '',
        },
  });
  const { t } = useTranslation();
  const submit = (data: OperationChangeFormValues) => {
    const category = categories.find((c) => c.id === data.categoryId);
    if (!category) return;

    const operation: Operation = initial
      ? {
          ...initial,
          title: data.title,
          description: data.description,
          amount: data.amount,
          categoryId: data.categoryId,
          category,
        }
      : {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          title: data.title,
          description: data.description,
          amount: data.amount,
          categoryId: data.categoryId,
          category,
        };

    onSave(operation);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${styles['operation-form']} ${theme === 'dark' ? styles.dark : ''}`}
    >
      <div className={styles['operation-form__item']}>
        <label>{t('operation_name_cap')}*</label>
        <input
          {...register('title', { required: `${t('enter')} ${t('operation_name_low')}` })}
          placeholder={`${t('enter')} ${t('operation_name_low')}`}
        />
        {errors.title && <span className={styles['error-message']}>{errors.title.message}</span>}
      </div>

      <div className={styles['operation-form__item']}>
        <label>{t('operation_description_cap')}</label>
        <textarea
          {...register('description', { maxLength: { value: 500, message: `${t('maximum_500_characters')}` } })}
          placeholder={`${t('enter')} ${t('operation_description_low')}`}
        />
        {errors.description && <span className={styles['error-message']}>{errors.description.message}</span>}
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
          {errors.categoryId && <span className={styles['error-message']}>{errors.categoryId.message}</span>}
        </div>
      </div>

      <button type="submit" className={styles['operation-form__submit']}>
        {initial ? `${t('save_changes')}` : `${t('create_operation')}`}
      </button>
    </form>
  );
};
