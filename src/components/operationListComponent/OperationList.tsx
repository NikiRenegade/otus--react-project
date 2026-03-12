import React, { useContext } from 'react';
import styles from './operationList.module.scss';
import { Operation } from '../../entities/Operation';
import { OperationShort } from '../operationShortComponent/OperationShort';
import { ThemeContext } from '../../contexts/ThemeContext';

interface OperationListProps {
  operations: Operation[];
  onView: (op: Operation) => void;
  onEdit: (op: Operation) => void;
  onDelete: (id: string) => void;
}
export function OperationList({ operations, onView, onEdit, onDelete }: OperationListProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${styles['operation-list']} ${styles[theme]}`} data-test={theme}>
      {operations.map((operation) => (
        <div className={styles['operation-list__item']} key={operation.id}>
          <OperationShort operation={operation} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
