import React from 'react';
import styles from './cancel.module.scss';

const CancelButton = ({ onClick = () => {} }) => {
  return (
    <span className={styles.cancelBtn} onClick={onClick}>
      ✕
    </span>
  );
};

export default CancelButton;
