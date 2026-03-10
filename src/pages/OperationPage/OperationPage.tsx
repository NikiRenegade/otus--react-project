import { notification } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { OperationList } from '../../components/operationListComponent/OperationList';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Operation } from '../../entities/Operation';
import { useDeleteOperationMutation, useGetOperationsQuery } from '../../store/api';
import { normalizeApiError } from '../../utils/normalizeApiError';
import styles from './OperationPage.module.scss';

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
      console.error(err);
      const { name, message } = normalizeApiError(err);
      switch (name) {
        case 'NotFoundError':
          notification.error({ title: t('operation_not_found_error'), description: message });
          break;
        case 'NotAllowedError':
          notification.error({ title: t('you_cant_remove_this_operation'), description: message });
          break;
        case 'InternalServerError':
          notification.error({ title: t('internal_server_error'), description: message });
          break;
        default:
          notification.error({ title: message });
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
