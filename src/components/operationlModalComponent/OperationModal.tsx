// src/components/operationModalComponent/OperationModal.tsx
import React from 'react';
import { OperationFull } from '../operationFullComponent/OperationFull';
import { OperationChangeForm } from '../../features/forms/OperationForm/OperationChangeForm';
import { Operation } from '../../entities/Operation';
import { Modal } from '../modalComponent/Modal';
import { categories } from '../../entities/Category';
export type OperationMode = 'view' | 'edit';

interface OperationModalProps {
  operation?: Operation;
  mode: OperationMode;
  onClose: () => void;
  onSave?: (updated: Operation) => void;
}

export const OperationModal: React.FC<OperationModalProps> = ({ operation, mode, onClose, onSave }) => {
  return (
    <Modal visible onClose={onClose} size={mode === 'view' ? 'md' : 'lg'}>
      {mode === 'view' && (
        <OperationFull
          title={operation.title}
          categoryName={categories.find(c => c.id === operation.categoryId).name}
          description={operation.description ?? ''}
          amount={operation.amount}
          dateTime={operation.createdAt || new Date().toISOString()}
          categoryColor="#4f46e5"
        />
      )}

      {mode === 'edit' && onSave && operation && (
        <OperationChangeForm
          initial={{
            id: operation.id,
            title: operation.title,
            description: operation.description,
            amount: operation.amount,
            categoryId: operation.categoryId,
            category: operation.category,
            createdAt: operation.createdAt ? operation.createdAt : new Date().toISOString(),
          }}
          onSave={onSave}
        />
      )}

      {mode === 'edit' && onSave && !operation && <OperationChangeForm onSave={onSave} />}
    </Modal>
  );
};
