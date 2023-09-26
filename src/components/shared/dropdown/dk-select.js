import React from "react";
import styles from "./dk-select.module.scss";

const DkSelect = ({
  onChange,
  options,
  selectedValue,
  name,
  className = "",
  optionClass = "",
  ...props
}) => {
  return (
    <select
      name={name}
      className={`${styles.select} ${className}`}
      value={selectedValue}
      onChange={onChange}
      {...props}
    >
      {options.map((opt, index) => (
        <option
          className={optionClass}
          key={index}
          value={opt.id}
          disabled={opt.disabled}
          style={opt.style}
        >
          {opt.name}
        </option>
      ))}
    </select>
  );
};

export default DkSelect;
