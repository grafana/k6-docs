import { Heading } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';

import styles from './doc-icons-row.module.scss';

export const DocIconsRow = ({ className, title, subtitle, iconsData }) => (
  <div className={`container ${styles.wrapper} ${className}`}>
    {title && (
      <Heading tag={'h2'} size={'lg'}>
        {title}
      </Heading>
    )}
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    <ul className={`${styles.iconsContainer}`}>
      {iconsData.map(({ Icon, name, link, to }, i) => (
        <li className={styles.iconWrapper} key={`iconi-${i}`}>
          {to ? (
            <Link className={styles.link} to={to}>
              <Icon className={styles.icon} />
              <p
                className={'link'}
                dangerouslySetInnerHTML={{ __html: name }}
              />
            </Link>
          ) : (
            <a className={styles.link} href={link}>
              <Icon className={styles.icon} />
              <p
                className={'link'}
                dangerouslySetInnerHTML={{ __html: name }}
              />
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);
