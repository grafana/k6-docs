import * as React from 'react';
import styles from './code.module.scss';

export const Code = ({ children, noLineNumbers }) => {
  return (
    <div
      className={`${styles.code} ${styles.codeContainer} ${
        noLineNumbers ? styles.noLineNumbers : ''
      }`}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
