import React, { useContext } from 'react';
import { OperationShortModel } from '../../entities/OperationShortModel';
import styles from './opetationShort.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
interface OperationShortProps {
  operation: OperationShortModel;
  onView: (op: OperationShortModel) => void;
  onEdit: (op: OperationShortModel) => void;
}
export function OperationShort({ operation, onView, onEdit }: OperationShortProps) {
  const { theme } = useContext(ThemeContext);
  const { title, category, description, amount } = operation;

  return (
    <div className={`${styles['operation-short']} ${styles[theme]}`}>
      <div className={styles['operation-short__actions']}>
        <button className={styles['operation-short__button']} onClick={() => onView(operation)}>
          👁
        </button>
        <button className={styles['operation-short__button']} onClick={() => onEdit(operation)}>
          ✏️
        </button>
      </div>
      <div className={styles['operation-short__information']}>
        <div className={styles['operation-short__left']}>
          <h3 className={styles['operation-short__title']}>{title}</h3>
          <p className={styles['operation-short__category']}>{category}</p>
        </div>
        <div className={styles['operation-short__right']}>
          <h3 className={`${styles['operation-short__amount']} ${amount > 0 ? styles.positive : styles.negative}`}>
            {amount}
          </h3>
          <p className={styles['operation-short__description']}>{description}</p>
        </div>
      </div>
    </div>
  );
}
