import React from 'react';
import { useRouter } from 'next/router';
import { INDEX_PATH } from '../../../constants/router-constants';
import s from './header.module.scss';

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className={s.header}>
      <div className={s.container}>
        <button
          type="button"
          className={s.logo}
          onClick={() => router.push(INDEX_PATH)}
        >
          Now!
        </button>
      </div>
    </header>
  );
};

export default Header;
