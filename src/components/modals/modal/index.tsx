import React from 'react';
import styles from './modal.module.scss';

const Modal = ({ children }: any) => (
  <div className={styles.wrap}>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

export default Modal;
