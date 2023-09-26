import React from "react";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import DatePickerImg from "../../../public/images/datePicker.svg";
import styles from "./date-range.module.scss";

const DateRange = ({ onApply, dateRange, inputClass = "" }) => {
  const handleEvent = (event, picker) => {
    if (event.type === "apply") {
      onApply(picker);
    }
  };

  return (
    <DateRangePicker alwaysShowCalendars={true} onEvent={handleEvent}>
      <button className={`${styles.datePicker} ${inputClass}`}>
        <img src={DatePickerImg} className="lazyload" alt="date-rang-img" />{" "}
        <span className={styles.text}>
          {moment(dateRange.from).format("ll")} -{" "}
          {moment(dateRange.to).format("ll")}
        </span>
      </button>
    </DateRangePicker>
  );
};

export default DateRange;
