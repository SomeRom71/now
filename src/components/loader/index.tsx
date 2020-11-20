import React from 'react';
import cn from 'classnames';
import styles from './loader.module.scss';

interface ILoader {
  size?: 's' | 'm'
}

const Loader = ({ size }: ILoader) => (
  <div className={cn(styles.loader, styles[`size-${size ?? 's'}`])}>
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
