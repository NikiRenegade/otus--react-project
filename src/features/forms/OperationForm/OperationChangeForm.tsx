import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Operation } from '../../../entities/Operation';
import { Category } from '../../../entities/Category';
import styles from './OperationChangeForm.module.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const getCategories = (): Category[] => [
  { id: Math.random().toString(36).substring(2, 9), name: 'Магазин' },
  { id: Math.random().toString(36).substring(2, 9), name: 'Аренда' },
  { id: Math.random().toString(36).substring(2, 9), name: 'Одежда' },
  { id: Math.random().toString(36).substring(2, 9), name: 'Кафе' },
  { id: Math.random().toString(36).substring(2, 9), name: 'Заработная плата' },
  { id: Math.random().toString(36).substring(2, 9), name: 'Премия' },
  { id: Math.random().toString(36).substring(2, 9), name: 'Выполнение заказа' },
  { id: Math.random().toString(36).substring(2, 9), name: 'Перевод' },
];

export interface OperationChangeFormValues {
  name: string;
  desc?: string;
  amount: number;
  categoryId: string;
}

export const OperationChangeForm: React.FC<{ initial?: Operation }> = ({ initial }) => {
  const { theme } = useContext(ThemeContext);
  const onSubmit = (data: OperationChangeFormValues) => {
    if (initial) {
      const updated: Operation = {
        ...initial,
        name: data.name,
        desc: data.desc,
        amount: data.amount,
        category: getCategories().find((c) => c.id === data.categoryId)!,
      };

      console.log('update:', updated);
    } else {
      const newOperation: Operation = {
        id: crypto.randomUUID(),
        name: data.name,
        desc: data.desc,
        createdAt: new Date().toISOString(),
        amount: data.amount,
        category: getCategories().find((c) => c.id === data.categoryId)!,
      };

      console.log('create:', newOperation);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
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

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const submit = (data: OperationChangeFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`${styles['operation-form']} ${theme === 'dark' ? styles.dark : ''}`}
    >
      <div className={styles['operation-form__item']}>
        <label>Название операции*</label>
        <input
          {...register('name', { required: 'Введите название операции' })}
          placeholder="Введите название операции"
        />
        {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}
      </div>

      <div className={styles['operation-form__item']}>
        <label>Описание операции</label>
        <textarea
          {...register('desc', { maxLength: { value: 500, message: 'Максимум 500 символов' } })}
          placeholder="Описание операции"
        />
        {errors.desc && <span className={styles['error-message']}>{errors.desc.message}</span>}
      </div>

      <div className={styles['operation-form__grid']}>
        <div className={styles['operation-form__item-small']}>
          <label>Сумма операции*</label>
          <input
            type="number"
            {...register('amount', {
              required: 'Введите сумму операции',
              valueAsNumber: true,
              validate: (v) => v > 0 || 'Введите сумму больше нуля',
            })}
            placeholder="0.00"
          />
          {errors.amount && <span className={styles['error-message']}>{errors.amount.message}</span>}
        </div>

        <div className={styles['operation-form__item-small']}>
          <label>Категория операции*</label>
          <select
            {...register('categoryId', {
              required: 'Выберите категорию',
            })}
          >
            <option value="">-- выбрать --</option>
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
        {initial ? 'Сохранить изменения' : 'Создать операцию'}
      </button>
    </form>
  );
};