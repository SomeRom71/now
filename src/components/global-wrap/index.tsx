import React from 'react';
import s from './global-wrap.module.scss';

type IGlobalWrap = {
  children: React.ReactNode
};

const GlobalWrap: React.FC<IGlobalWrap> = ({ children }: IGlobalWrap) => (
  <div className={s.wrap}>
    {children}
  </div>
);

export default GlobalWrap;
