import React from 'react';

import styles from './header.module.scss';

export const Header = ({ children }) => (
  <header className={styles.wrapper}>
    <div className={'container'}>
      <div className={'row align-items-center'}>
        {children}
      </div>
    </div>
  </header>
);
