import React from 'react';
import styles from './submit.module.scss';

const SubmitButton = ({
  type = 'button',
  onClick = () => {},
  btnClass = '',
  children,
  ...props
}) => (
  <button
    type={type}
    className={`${styles.submitBtn} ${btnClass}`}
    onClick={onClick}
    {...props}>
    {children}
  </button>
);

export default SubmitButton;
