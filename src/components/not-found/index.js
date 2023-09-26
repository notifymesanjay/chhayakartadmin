import React from "react";
import styles from "./index.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <p>
        Please <a className={styles.link} href="/login">login</a> to view Data
      </p>
    </div>
  );
};

export default NotFound;
