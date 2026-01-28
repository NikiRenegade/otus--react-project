import React, { useContext } from 'react';
import styles from './operationFull.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
interface OperationFullProps {
  title: string;
  categoryName: string;
  description: string;
  amount: number;
  dateTime: string;
  categoryColor: string;
}
export function OperationFull({
  title,
  categoryName,
  description,
  amount,
  dateTime,
  categoryColor,
}: OperationFullProps) {
  const { theme } = useContext(ThemeContext);
  const parsedDate = new Date(dateTime);

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
        <button className={styles['operation-full__edit-button']}>✏️</button>
      </div>
      <div className={styles['operation-full__main']}>
        <div className={styles['operation-full__title']}>{title}</div>
        <div className={styles['operation-full__category']}>{categoryName}</div>
        <h3 className={`${styles['operation-full__amount']} ${amount > 0 ? styles.positive : styles.negative}`}>
          {amount}
        </h3>
      </div>
      <div className={styles['operation-full__footer']}>
        <p className={styles['operation-full__description']}>{description}</p>
      </div>
    </div>
  );
}
