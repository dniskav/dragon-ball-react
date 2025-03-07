import { ReactNode } from 'react';
import styles from './AbcButton.module.css';

interface AbcButtonProps {
  label?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const AbcButton: React.FC<AbcButtonProps> = ({ label, children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children || label}
    </button>
  );
};

export default AbcButton;