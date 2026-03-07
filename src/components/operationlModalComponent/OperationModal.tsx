import React from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { OperationFull } from '../operationFullComponent/OperationFull';
import { OperationChangeForm, OperationChangeFormValues } from '../../features/forms/OperationForm/OperationChangeForm';
import { Operation } from '../../entities/Operation';
import { Modal } from '../modalComponent/Modal';
import { useCreateOperationMutation, useUpdateOperationMutation, useGetOperationQuery } from '../../store/api';
import { useTranslation } from 'react-i18next';
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
    } catch (err) {
      switch (err?.data?.errors[0]?.name) {
        case 'NotValidIdError':
          alert(`${t('operation_category_is_not_valid')}`);
          break;
        case 'FieldRequiredError':
          alert(`${t('operation_category_is_required')}`);
          break;
        case 'NotFoundError':
          alert(`${t('operation_category_not_found_error')}`);
          break;
        case 'ValidationError':
          alert(`${t('validation_error')}`);
          break;
        case 'InternalServerError':
          alert(`${t('internal_server_error')}`);
          break;
        default:
          alert(err?.data?.errors[0]?.message);
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
    } catch (err) {
      switch (err?.data?.errors[0]?.name) {
        case 'NotFoundError':
          alert(`${t('operation_not_found_error')}`);
          break;
        case 'NotAllowedError':
          alert(`${t('you_cant_edit_this_operation')}`);
          break;
        case 'ValidationError':
          alert(`${t('validation_error')}`);
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
      {mode === 'edit' && operation && (
        <OperationChangeForm
          initial={operation}
          onSave={handleOperationUpdate}
        />
      )}

      {mode === 'edit' && !operationId && <OperationChangeForm onSave={handleOperationCreate} />}
    </Modal>
  );
};
