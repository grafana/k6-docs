import React from 'react';
import classNames from 'classnames';

import styles from './footer-column.module.scss';

const getClassNames = docLayout =>
  classNames(
    { 'col-lg-3': !!docLayout },
    { 'col-md-3': !docLayout },
    'col-6',
    styles.bottomLinkColumn,
  );

export const FooterColumn = ({ title, items, docLayout }) => {
  return (
    <div className={`${getClassNames(docLayout)}`}>
      <h3 className={styles.navColumnTitle}>{title}</h3>
      <ul className={styles.navColumnList}>
        {items.map(item => (
          <li className={styles.navColumnItem}>
            <a className={styles.navColumnLink} href={`${item.url}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
