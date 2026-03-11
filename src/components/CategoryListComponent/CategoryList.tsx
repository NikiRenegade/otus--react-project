import React, { useContext } from 'react';
import { Category } from '../../entities/Category';
import styles from './CategoryList.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

interface Props {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryList: React.FC<Props> = ({ categories, onEdit, onDelete }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles['category-list']} ${styles[theme]}`}>
      {categories.map((category) => (
        <div key={category.id} className={styles['category-list__item']}>
          <span className={styles['category-list__name']}>{category.name}</span>

          <div className={styles['category-list__actions']}>
            <button className={styles['category-list__button']} onClick={() => onEdit(category)}>
              ✏️
            </button>

            <button className={styles['category-list__button']} onClick={() => onDelete(category.id)}>
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};