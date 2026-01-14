import React, { useContext, useState } from 'react';
import { OperationList } from '../../components/operationListComponent/OperationList';
import { Operation } from '../../entities/Operation';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, State } from '../../store/index';
import { categories } from '../../entities/Category';
import { deleteOperation } from '../../store/slices/operationsSlice';
import styles from './OperationPage.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
export const OperationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const operations = useSelector((state: State) => state.operations);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const operationShort: Operation[] = operations.map((op) => ({
    id: op.id,
    title: op.title,
    categoryId: op.categoryId,
    amount: op.amount,
    description: op.description,
    createdAt: op.createdAt,
    category: categories.find((c) => c.id === op.categoryId),
  }));
  const onView = (op: Operation) => {
    navigate(`/operations/${op.id}/view`, { state: { background: location } });
  };

  const onEdit = (op: Operation) => {
    navigate(`/operations/${op.id}/edit`, { state: { background: location } });
  };
  const onDelete = (id: string) => {
    dispatch(deleteOperation(id));
  };

  return (
    <div className={`${styles['operation-page']} ${styles[theme]}`}>
      <button
        onClick={() => navigate('/operations/new/edit', { state: { background: location } })}
        className={`${styles['operation-page__button']}`}
      >
        + Добавить операцию
      </button>
      <OperationList operations={operationShort} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};
