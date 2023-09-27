import React from 'react';
import styles from './primary.module.scss';

const PrimaryButton = ({
  type = 'button',
  onClick = () => {},
  btnClass = '',
  children,
  ...props
}) => (
  <button
    type={type}
    className={`${styles.primaryBtn} ${btnClass}`}
    onClick={onClick}
    {...props}>
    {children}
  </button>
);

export default PrimaryButton;
