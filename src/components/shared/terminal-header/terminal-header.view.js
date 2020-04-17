import React from 'react';
import classNames from 'classnames';
import styles from './terminal-header.module.scss';

export const TerminalHeader = ({ title, theme }) => (
  <div
    className={classNames([
      styles.terminalHeader,
      { [`${styles.white}`]: theme === 'white' },
      { [`${styles.grey}`]: theme === 'grey' },
    ])}
  >
    <span className={styles.button}/>
    <span className={styles.button}/>
    <span className={styles.button}/>
    <span className={styles.title}>{title}</span>
  </div>
);
