import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './button.module.scss';
import Loader from '../loader';

interface IButton {
  children: ReactNode,
  className?: string,
  id?: string,
  styleType: string,
  type?: 'button' | 'submit' | 'reset',
  disabled?: boolean,
  loading?: boolean,
  onClick?: Function,
}

const Button = ({
  children, className, styleType, type, loading, id, onClick = () => {}, ...props
}: IButton) => (
  <button
    type={type}
    id={id}
    className={cn(styles.main, styles[styleType], className)}
    onClick={() => onClick()}
    {...props}
  >
    {loading ? <Loader /> : children}
  </button>
);

export default Button;
