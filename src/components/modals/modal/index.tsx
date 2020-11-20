import React from 'react';
import cn from 'classnames';
import styles from './modal.module.scss';

interface Imodal {
  children: React.ReactNode,
  size: 's' | 'm' | 'l',
}

const Modal = ({ children, size }: Imodal) => (
  <div className={styles.wrap}>
    <div className={cn(styles.content, styles[`size-${size}`])}>
      {children}
    </div>
  </div>
);

export default Modal;
