import { Link } from 'gatsby';
import * as React from 'react';

import styles from './doc-page-breadcrumbs.module.scss';

export const Breadcrumbs = (props) => {
  const { items, label } = props;
  return (
    <ul className={`${styles.wrapper} ${label}`}>
      {items.map((item, idx) => (
        <li key={item.path} className={styles.itemContainer}>
          {idx === items.length - 1 ? (
            <span className={styles.item}>{item.name}</span>
          ) : (
            <Link className={styles.item} to={item.path}>
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
