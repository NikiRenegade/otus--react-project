import React, { useState, useContext } from 'react';
import styles from './operationList.module.scss';
import { Operation } from '../../entities/Operation';
import { OperationShort } from '../operationShortComponent/OperationShort';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface OperationListProps {
  operations: Operation[];
  onView: (op: Operation) => void;
  onEdit: (op: Operation) => void;
  onDelete: (id: string) => void;
}

type SortField = 'createdAt' | 'amount' | 'name';

export function OperationList({ operations, onView, onEdit, onDelete }: OperationListProps) {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [asc, setAsc] = useState(false);

  const sortedOperations = [...operations].sort((a, b) => {
    let result = 0;

    switch (sortField) {
      case 'createdAt':
        result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;

      case 'amount':
        result = a.amount - b.amount;
        break;

      case 'name':
        result = a.name.localeCompare(b.name);
        break;
    }

    return asc ? result : -result;
  });
  return (
    <>
      <div className={`${styles['operation-list__sort']} ${styles[theme]}`} data-test={theme}>
        <span>{t('sort_by')}:</span>

        <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}>
          <option value="createdAt">{t('operation_creation_date')}</option>
          <option value="amount">{t('operation_amount_cap')}</option>
          <option value="name">{t('operation_name_cap')}</option>
        </select>

        <button onClick={() => setAsc((value) => !value)}>{asc ? '↑' : '↓'}</button>
      </div>
      <div className={`${styles['operation-list']} ${styles[theme]}`} data-test={theme}>
        {sortedOperations.map((operation) => (
          <div className={styles['operation-list__item']} key={operation.id}>
            <OperationShort operation={operation} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </>
  );
}
