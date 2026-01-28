import React from 'react';
import { AuthModal } from '../authModalComponent/AuthModal';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { OperationModal } from '../operationlModalComponent/OperationModal';
import { AppDispatch, State } from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
import { addOperation, updateOperation } from '../../store/slices/operationsSlice';

export const ModalManager: React.FC = () => {
  const operations = useSelector((state: State) => state.operations);
  const dispatch = useDispatch<AppDispatch>();
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
    return (
      <OperationModal
        mode="edit"
        onClose={closeModal}
        onSave={(operation) => {
          dispatch(addOperation(operation));
          closeModal();
        }}
      />
    );
  }

  if (id && mode) {
    const operation = operations.find((op) => op.id === id);
    if (!operation) return null;
    return (
      <OperationModal
        operation={operation}
        mode={mode}
        onClose={closeModal}
        onSave={(operation) => {
          dispatch(updateOperation(operation));
          closeModal();
        }}
      />
    );
  }

  return null;
};
