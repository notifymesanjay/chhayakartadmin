import React from "react";
import styles from "./actions.module.scss";

const ActionsDropDown = ({
  itemList = [],
  dropDownClass = "",
  menuClass = "",
}) => {
  return (
    <div className={`dropdown ${dropDownClass}`}>
      <span className={styles.toggleBtn} data-toggle="dropdown"></span>

      <div
        className={`dropdown-menu ${styles.actionMenu} ${menuClass}`}
        aria-labelledby="btnGroupActions"
      >
        {itemList.map((item, index) =>
          item.show ? (
            <a
              key={index}
              className={`dropdown-item btn btn-link ${styles.actionVal} ${item.className}`}
              title={item.toolTip}
              disabled={item.disabled}
              onClick={!item.pageRedirection ? item.onClick : {}}
              href={item.pageRedirection && item.link}
            >
              {item.label}
            </a>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default ActionsDropDown;
