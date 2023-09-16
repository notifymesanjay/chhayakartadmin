import React from "react";
import styles from "./input.module.scss";

const Input = ({
  id = "",
  name = "",
  value = "",
  className = "",
  isRequired = false,
  isDisabled = false,
  onChange = () => {},
  ...props
}) => {
  return (
    <input
      id={id}
      name={name}
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
      required={isRequired}
      disabled={isDisabled}
      {...props}
    />
  );
};

export default Input;
