import React from 'react';
import { AuthModal } from '../authModalComponent/AuthModal';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { OperationModal } from '../operationModalComponent/OperationModal';

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
  if (location.pathname === '/operations/new/edit') {
    return <OperationModal mode="edit" onClose={closeModal} />;
  }

  if (location.pathname.startsWith('/operations/') && id && mode) {
    return <OperationModal operationId={id} mode={mode} onClose={closeModal} />;
  }

  return null;
};
