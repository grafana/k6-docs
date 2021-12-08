import { Link } from 'gatsby';
import React from 'react';

import styles from './item-card.module.scss';

export const ItemCard = (props) => {
  const {
    children,
    liftOnHover = true,
    lifted,
    as,
    label,
    noBorderOnHover,
    ...rest
  } = props;
  const Component = as || Link;

  return (
    <Component
      className={`${styles.wrapper} ${label} ${lifted ? styles.lifted : ''} ${
        liftOnHover ? styles.liftedOnHover : ''
      }`}
      {...rest}
    >
      {!noBorderOnHover && (
        <div className={`${styles.circleWrapper} ${styles.circleWrapper1}`}>
          <div className={styles.circle} />
        </div>
      )}
      {children}
    </Component>
  );
};
