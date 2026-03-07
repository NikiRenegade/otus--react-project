import React, { useContext } from 'react';
import { Operation } from '../../entities/Operation';
import styles from './opetationShort.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

interface OperationShortProps {
  operation: Operation;
  onView: (op: Operation) => void;
  onEdit: (op: Operation) => void;
  onDelete: (id: string) => void;
}

export function OperationShort({ operation, onView, onEdit, onDelete }: OperationShortProps) {
  const { theme } = useContext(ThemeContext);
  const { name, desc, amount, category } = operation;

  return (
    <div className={`${styles['operation-short']} ${styles[theme]}`}>
      <div className={styles['operation-short__actions']}>
        <button className={styles['operation-short__button']} onClick={() => onView(operation)}>
          👁
        </button>
        <div>
          <button className={styles['operation-short__button']} onClick={() => onEdit(operation)}>
            ✏️
          </button>
          <button className={styles['operation-short__button']} onClick={() => onDelete(operation.id)}>
            🗑️
          </button>
        </div>
      </div>
      <div className={styles['operation-short__information']}>
        <div className={styles['operation-short__left']}>
          <h3 className={styles['operation-short__name']}>{name}</h3>
          <p className={styles['operation-short__category']}>{category.name}</p>
        </div>
        <div className={styles['operation-short__right']}>
          <h3 className={`${styles['operation-short__amount']} ${amount > 0 ? styles.positive : styles.negative}`}>
            {amount}
          </h3>
          <p className={styles['operation-short__description']}>{desc}</p>
        </div>
      </div>
    </div>
  );
}
