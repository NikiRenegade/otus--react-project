import React, { useContext } from 'react';
import { OperationShortModel } from '../../entities/OperationShortModel';
import styles from './opetationShort.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
interface OperationShortProps {
  operation: OperationShortModel;
}
function OperationShort({ operation }: OperationShortProps) {
  const { theme } = useContext(ThemeContext);
  const { title, category, description, amount } = operation;

  return (
    <div className={`${styles['operation-short']} ${styles[theme]}`}>
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
  );
}
