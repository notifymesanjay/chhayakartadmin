import React from 'react';
import Image from 'next/image';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chhayakartLogo from '../../public/images/chhayakart-pink-logo.png';
import { useResponsive } from '../shared/use-responsive';
import styles from './collapsible-menu.module.scss';
import CustomLink from '../customLink';

const CollapsibleMenu = ({ children, isOpen, toggleCollapse, navbarBrand }) => {
  const { isSmScreen } = useResponsive();

  return isSmScreen ? (
    <div
      className={`${styles.collapsibleMenu} ${styles.mobileSidebar} ${
        isOpen && styles.open
      }`}>
      <div className={isOpen && styles.logoWrapper}>
        {isOpen && (
          <Image
            src={chhayakartLogo}
            className={styles.logo}
            width={175}
            height={41}
          />
        )}
        <div className={isOpen ? styles.closedHeader : styles.header}>
          <button
            className={isOpen ? styles.openBtn : styles.closeBtn}
            onClick={() => toggleCollapse(!isOpen)}>
            {isOpen ? 'X' : '☰'}
          </button>
        </div>
      </div>
      <div className={styles.menuBody}>{children}</div>
    </div>
  ) : (
    <div
      className={`${styles.collapsibleMenu} ${
        isOpen ? styles.open : styles.close
      }`}>
      <div className={styles.logoWrapper}>
        {isOpen && (
          <Image
            src={chhayakartLogo}
            className={styles.logo}
            width={175}
            height={41}
          />
        )}
        <div className={styles.header}>
          <button
            className={styles.closeBtn}
            onClick={() => toggleCollapse(!isOpen)}>
            {isOpen ? (
              <i className={styles.icon}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </i>
            ) : (
              <i className={styles.icon}>
                <FontAwesomeIcon icon={faArrowRight} />
              </i>
            )}
          </button>
        </div>
      </div>
      <div className={styles.menuBody}>{children}</div>
    </div>
  );
};

export default CollapsibleMenu;
