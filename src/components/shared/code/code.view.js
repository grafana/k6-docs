import * as React from 'react';

import styles from './code.module.scss';
import './code-inline.scss';

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

export const CodeInline = ({ children }) => (
  <span className="code-inline">{children}</span>
);
