// src/components/operationModalComponent/OperationModal.tsx
import React from 'react';
import { OperationFull } from '../operationFullComponent/OperationFull';
import { OperationChangeForm } from '../../features/forms/OperationForm/OperationChangeForm';
import { OperationShortModel } from '../../entities/OperationShortModel';
import { Modal } from '../modalComponent/Modal';

export type OperationMode = 'view' | 'edit';

interface OperationModalProps {
  operation: OperationShortModel;
  mode: OperationMode;
  onClose: () => void;
  onSave?: (updated: OperationShortModel) => void;
}

export const OperationModal: React.FC<OperationModalProps> = ({ operation, mode, onClose, onSave }) => {
  return (
    <Modal visible onClose={onClose} size={mode === 'view' ? 'md' : 'lg'}>
      {mode === 'view' && (
        <OperationFull
          title={operation.title}
          category={operation.category}
          description={operation.description ?? ''}
          amount={operation.amount}
          dateTime={new Date().toISOString()}
          categoryColor="#4f46e5"
        />
      )}

      {mode === 'edit' && onSave && (
        <OperationChangeForm
          initial={{
            id: operation.id,
            name: operation.title,
            desc: operation.description,
            amount: operation.amount,
            category: { id: 'mock', name: operation.category },
            createdAt: new Date().toISOString(),
          }}
        />
      )}
    </Modal>
  );
};
