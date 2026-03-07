import React, { useContext } from 'react';
import { OperationList } from '../../components/operationListComponent/OperationList';
import { Operation } from '../../entities/Operation';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './OperationPage.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useGetOperationsQuery, useDeleteOperationMutation } from '../../store/api';
import { useTranslation } from 'react-i18next';
export const OperationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { data } = useGetOperationsQuery();
  const [deleteOperation] = useDeleteOperationMutation();
  const operations: Operation[] = data?.data ?? [];
  const onView = (op: Operation) => {
    navigate(`/operations/${op.id}/view`, { state: { background: location } });
  };

  const onEdit = (op: Operation) => {
    navigate(`/operations/${op.id}/edit`, { state: { background: location } });
  };
  const onDelete = async (operationId: string) => {
    try {
      await deleteOperation(operationId).unwrap();
    } catch (err) {
      switch (err?.data?.errors[0]?.name) {
        case 'NotFoundError':
          alert(`${t('operation_not_found_error')}`);
          break;
        case 'NotAllowedError':
          alert(`${t('you_cant_remove_this_operation')}`);
          break;
        case 'InternalServerError':
          alert(`${t('internal_server_error')}`);
          break;
        default:
          alert(err?.data?.errors[0]?.message);
      }
    }
  };
  return (
    <div className={`${styles['operation-page']} ${styles[theme]}`}>
      <button
        onClick={() => navigate('/operations/new/edit', { state: { background: location } })}
        className={`${styles['operation-page__button']}`}
      >
        + Добавить операцию
      </button>
      <OperationList operations={operations} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};
