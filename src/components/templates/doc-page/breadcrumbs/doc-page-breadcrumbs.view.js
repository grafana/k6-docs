import * as React from 'react';
import { Link } from 'gatsby';
import styles from './doc-page-breadcrumbs.module.scss';

export const Breadcrumbs = (props) => {
  const { items, label } = props;
  return (
    <div className={`${styles.wrapper} ${label}`}>
      {items.map((item) => (
        <div key={item.path} className={styles.itemContainer}>
          <Link className={styles.item} to={item.path}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
