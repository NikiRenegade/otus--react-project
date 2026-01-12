import React from 'react';
import { AuthModal } from '../authModalComponent/AuthModal';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { OperationModal } from '../operationlModalComponent/OperationModal';
import { operations } from '../../entities/OperationShortModel';

export const ModalManager: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { id, mode } = useParams<{ id?: string; mode?: 'view' | 'edit' }>();
  const closeModal = () => navigate(background?.pathname || '/');
  if (location.pathname === '/login')
    return <AuthModal mode="login" onClose={closeModal} onSwitch={(m) => navigate(`/${m}`)} />;
  if (location.pathname === '/register')
    return <AuthModal mode="register" onClose={closeModal} onSwitch={(m) => navigate(`/${m}`)} />;
  console.log(mode);
  if (id && mode) {
    const operation = operations.find((op) => op.id === id);
    if (!operation) return null;
    return (
      <OperationModal
        operation={operation}
        mode={mode}
        onClose={closeModal}
        onSave={mode === 'edit' ? (updated) => console.log('save', updated) : undefined}
      />
    );
  }

  return null;
};
