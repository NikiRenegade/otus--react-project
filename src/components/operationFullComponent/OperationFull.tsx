import React, { useContext } from 'react';
import styles from './operationFull.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
interface OperationFullProps {
  name: string;
  categoryName: string;
  desc: string;
  amount: number;
  createdAt: Date;
  categoryColor: string;
}
export function OperationFull({ name, categoryName, desc, amount, createdAt, categoryColor }: OperationFullProps) {
  const { theme } = useContext(ThemeContext);
  const parsedDate = new Date(createdAt);

  const datePart = parsedDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timePart = parsedDate.toLocaleTimeString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const formattedDateTime = `${datePart} в ${timePart}`;
  return (
    <div className={`${styles['operation-full']} ${styles[theme]}`} data-test={theme}>
      <div className={styles['operation-full__header']} style={{ backgroundColor: categoryColor }}>
        <p className={styles['operation-full__date-time']}>{formattedDateTime}</p>
      </div>
      <div className={styles['operation-full__main']}>
        <div className={styles['operation-full__name']}>{name}</div>
        <div className={styles['operation-full__category']}>{categoryName}</div>
        <h3 className={`${styles['operation-full__amount']} ${amount > 0 ? styles.positive : styles.negative}`}>
          {amount}
        </h3>
      </div>
      <div className={styles['operation-full__footer']}>
        <p className={styles['operation-full__description']}>{desc}</p>
      </div>
    </div>
  );
}
