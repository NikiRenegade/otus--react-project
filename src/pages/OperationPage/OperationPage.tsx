import React, { useState } from 'react';
import { OperationList } from '../../components/operationListComponent/OperationList';
import { OperationShortModel } from '../../entities/OperationShortModel';
import { operations as mockOperations } from '../../entities/OperationShortModel';
import { OperationModal, OperationMode } from '../../components/operationlModalComponent/OperationModal';

export const OperationPage = () => {
  const [operations, setOperations] = useState<OperationShortModel[]>(mockOperations);
  const [selected, setSelected] = useState<OperationShortModel | null>(null);
  const [mode, setMode] = useState<OperationMode | null>(null);

  const onView = (op: OperationShortModel) => {
    setSelected(op);
    setMode('view');
  };

  const onEdit = (op: OperationShortModel) => {
    setSelected(op);
    setMode('edit');
  };

  const onClose = () => {
    setSelected(null);
    setMode(null);
  };

  const onSave = (updated: OperationShortModel) => {
    setOperations((prev) => prev.map((op) => (op.id === updated.id ? updated : op)));
    setSelected(updated);
    setMode('view');
  };

  return (
    <div>
      <OperationList operations={operations} onView={onView} onEdit={onEdit} />

      {selected && mode && (
        <OperationModal
          operation={selected}
          mode={mode}
          onClose={onClose}
          onSave={mode === 'edit' ? onSave : undefined}
        />
      )}
    </div>
  );
};
