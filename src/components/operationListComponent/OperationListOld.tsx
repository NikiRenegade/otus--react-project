import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './operationList.module.scss';
import { OperationShortModel } from '../../entities/OperationShortModel';
import { OperationShort } from '../operationShortComponent/OperationShort';
import { createRandomOperationShort } from '../../homeworks/ts1/3_write';
import { ThemeContext } from '../../contexts/ThemeContext';

interface OperationListProps {
  operations: OperationShortModel[];
}

export function OperationListOld({ operations }: OperationListProps) {
  const { theme } = useContext(ThemeContext);
  const [list, setList] = useState<OperationShortModel[]>(operations);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const onView = (op: OperationShortModel) => {
    console.log('onView', op);
  };

  const onEdit = (op: OperationShortModel) => {
    console.log('onEdit', op);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setList((prev) => [...prev, createRandomOperationShort()]);
        console.log(list);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [list]);

  return (
    <div className={`${styles['operation-list']} ${styles[theme]}`} data-test={theme}>
      {list.map((operation, index) => (
        <div className={styles['operation-list__item']} key={index}>
          <OperationShort operation={operation} onView={onView} onEdit={onEdit} />
        </div>
      ))}
      <div ref={loaderRef} className={styles['operation-list__loader']}>
        loading...
      </div>
    </div>
  );
}
