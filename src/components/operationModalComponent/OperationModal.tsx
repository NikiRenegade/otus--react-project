import { skipToken } from '@reduxjs/toolkit/query';
import { notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Operation } from '../../entities/Operation';
import { OperationChangeForm, OperationChangeFormValues } from '../../features/forms/OperationForm/OperationChangeForm';
import { useCreateOperationMutation, useGetOperationQuery, useUpdateOperationMutation } from '../../store/api';
import { normalizeApiError } from '../../utils/normalizeApiError';
import { Modal } from '../modalComponent/Modal';
import { OperationFull } from '../operationFullComponent/OperationFull';
export type OperationMode = 'view' | 'edit';

interface OperationModalProps {
  operationId?: string;
  mode: OperationMode;
  onClose: () => void;
  onSave?: (updated: Operation) => void;
}

export const OperationModal: React.FC<OperationModalProps> = ({ operationId, mode, onClose }) => {
  const { t } = useTranslation();
  const [createOperation] = useCreateOperationMutation();
  const [updateOperation] = useUpdateOperationMutation();
  const { data } = useGetOperationQuery((mode === 'edit' || mode === 'view') && operationId ? operationId : skipToken);
  const operation = data;
  const handleOperationCreate = async (data: OperationChangeFormValues) => {
    try {
      await createOperation({
        ...data,
        type: data.amount > 0 ? 'Profit' : 'Cost',
        date: new Date().toISOString(),
      }).unwrap();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const { name, message } = normalizeApiError(err);
      switch (name) {
        case 'NotValidIdError':
          notification.error({ title: t('operation_category_is_not_valid'), description: message });
          break;
        case 'FieldRequiredError':
          notification.error({ title: t('operation_category_is_required'), description: message });
          break;
        case 'NotFoundError':
          notification.error({ title: t('operation_category_not_found_error'), description: message });
          break;
        case 'ValidationError':
          notification.error({ title: t('validation_error'), description: message });
          break;
        case 'InternalServerError':
          notification.error({ title: t('internal_server_error'), description: message });
          break;
        default:
          notification.error({ title: message });
      }
    }
  };
  const handleOperationUpdate = async (data: OperationChangeFormValues) => {
    try {
      await updateOperation({
        id: operation.id,
        body: {
          ...data,
          type: data.amount > 0 ? 'Profit' : 'Cost',
          date: new Date().toISOString(),
        },
      }).unwrap();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const { name, message } = normalizeApiError(err);
      switch (name) {
        case 'NotFoundError':
          notification.error({ title: t('operation_not_found_error'), description: message });
          break;
        case 'NotAllowedError':
          notification.error({ title: t('you_cant_edit_this_operation'), description: message });
          break;
        case 'ValidationError':
          notification.error({ title: t('validation_error'), description: message });
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
    <Modal visible onClose={onClose} size={mode === 'view' ? 'md' : 'lg'}>
      {mode === 'view' && operation && (
        <OperationFull
          name={operation.name}
          categoryName={operation.category.name}
          desc={operation.desc ?? ''}
          amount={operation.amount}
          createdAt={operation.createdAt || new Date()}
          categoryColor="#4f46e5"
        />
      )}
      {mode === 'edit' && operation && <OperationChangeForm initial={operation} onSave={handleOperationUpdate} />}

      {mode === 'edit' && !operationId && <OperationChangeForm onSave={handleOperationCreate} />}
    </Modal>
  );
};
