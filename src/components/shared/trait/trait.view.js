import * as React from 'react';

import styles from './trait.module.scss';

export const Trait = (props) => {
  const { children, disadvantage, className = '' } = props;

  return (
    <div
      className={`${styles.wrapper} ${
        disadvantage ? styles.disadvantage : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
