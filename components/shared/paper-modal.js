import React from 'react';
import styles from './paper-modal.module.scss';

const PaperModal = ({
  title,
  onClose,
  children,
  footerContent = '',
  containerClass = '',
  inputClass = '',
  bodyClass = '',
  headerClass = '',
  footerClass = '',
  showHeader = true,
}) => {
  return (
    <div aria-labelledby='simple-modal-title' className={styles.paper}>
      <div className={`${styles.container} ${containerClass}`}>
        <div
          className={`${styles.header} ${
            showHeader ? '' : styles.noHeader
          } ${headerClass}`}>
          {showHeader && (
            <div className={styles.title}>
              <h4 id='simple-modal-title'>{title}</h4>
            </div>
          )}
          <div className={`${styles.closeBtnWrapper} ${inputClass}`}>
            <span className={styles.closeBtn} onClick={onClose}>
              &#x2715;
            </span>
          </div>
        </div>
        <div className={`${styles.content} ${bodyClass}`}>{children}</div>
        <div
          className={`${styles.footer} ${
            footerContent ? '' : styles.noFooter
          } ${footerClass}`}>
          {footerContent}
        </div>
      </div>
    </div>
  );
};

export default PaperModal;
