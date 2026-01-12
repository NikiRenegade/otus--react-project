import React, { useState } from 'react';
import { OperationList } from '../../components/operationListComponent/OperationList';
import { OperationShortModel } from '../../entities/OperationShortModel';
import { operations as mockOperations } from '../../entities/OperationShortModel';
import { useNavigate, useLocation } from 'react-router-dom';
export const OperationPage = () => {
  const [operations, setOperations] = useState<OperationShortModel[]>(mockOperations);
  const navigate = useNavigate();
  const location = useLocation();
  const onView = (op: OperationShortModel) => {
    navigate(`/operations/${op.id}/view`, { state: { background: location } });
  };

  const onEdit = (op: OperationShortModel) => {
    navigate(`/operations/${op.id}/edit`, { state: { background: location } });
  };

  return (
    <div>
      <OperationList operations={operations} onView={onView} onEdit={onEdit} />
    </div>
  );
};
