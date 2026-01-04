import React, { useState, useContext } from 'react';
import styles from './operationList.module.scss';
import { OperationShortModel } from '../../entities/OperationShortModel';
import { OperationShort } from '../operationShortComponent/OperationShort';
import { ThemeContext } from '../../contexts/ThemeContext';
interface OperationListProps {
  operations: OperationShortModel[];
  onView: (op: OperationShortModel) => void;
  onEdit: (op: OperationShortModel) => void;
}

export function OperationList({ operations, onView, onEdit }: OperationListProps) {
  const { theme } = useContext(ThemeContext);
  const [list, _] = useState<OperationShortModel[]>(operations);
  return (
    <div className={`${styles['operation-list']} ${styles[theme]}`} data-test={theme}>
      {list.map((operation, index) => (
        <div className={styles['operation-list__item']} key={index}>
          <OperationShort operation={operation} onView={onView} onEdit={onEdit} />
        </div>
      ))}
    </div>
  );
}
