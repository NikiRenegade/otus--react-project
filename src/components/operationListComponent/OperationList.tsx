import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './operationList.module.scss';
import { OperationShortModel } from '../../entities/OperationShortModel';
import { OperationShortMemo } from '../operationShortComponent/OperationShort';
import { createRandomOperationShort } from '../../homeworks/ts1/3_write';
import { ThemeContext } from '../../contexts/ThemeContext';

interface OperationListProps {
  operations: OperationShortModel[];
}

export function OperationList({ operations }: OperationListProps) {
  const { theme } = useContext(ThemeContext);
  const [list, setList] = useState<OperationShortModel[]>(operations);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setList((prev) => [...prev, createRandomOperationShort()]);
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles['operation-list']} ${styles[theme]}`} data-test={theme}>
      {list.map((operation, index) => (
        <div className={styles['operation-list__item']} key={index}>
          <OperationShortMemo operation={operation} />
        </div>
      ))}
      <div ref={loaderRef} className={styles['operation-list__loader']}>
        loading...
      </div>
    </div>
  );
}
