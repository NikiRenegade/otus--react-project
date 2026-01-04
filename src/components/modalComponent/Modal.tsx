import React, { useContext } from 'react';
import styles from './modal.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';
interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ visible, children, onClose, size = 'md' }: ModalProps) {
  const { theme } = useContext(ThemeContext);
  if (visible) {
    return (
      <div className={`${styles.modal__overlay}`}>
        <div className={`${styles.modal__window} ${styles[theme]} ${styles[size]}`}>
          <button className={styles.modal__close} onClick={onClose}>
            x
          </button>
          <div className={styles.modal__content}>{children}</div>
        </div>
      </div>
    );
  }
}
