import React from 'react';
import styles from './toggle.module.scss';

const Toggle = ({
  tabs,
  wrapperClass = '',
  customClass,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <div className={`${styles.tabsWrapper} ${wrapperClass}`}>
      {tabs.map((tab) => (
        <h2
          key={tab.id}
          className={`${styles.tab} ${customClass} ${
            selectedTab.id === tab.id ? styles.active : ''
          }`}
          onClick={() => {
            setSelectedTab(tab);
          }}>
          {tab.title}
        </h2>
      ))}
    </div>
  );
};

export default Toggle;
