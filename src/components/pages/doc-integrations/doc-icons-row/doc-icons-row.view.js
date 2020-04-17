import React from 'react';
import { Link } from 'gatsby';
import { Heading } from 'components/shared/heading';
import styles from './doc-icons-row.module.scss';

export const DocIconsRow = ({ className, title, subtitle, iconsData }) => (
  <div className={`container ${styles.wrapper} ${className}`}>
    <Heading tag={'h2'} size={'lg'}>
      {title}
    </Heading>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    <ul className={`row ${styles.iconsContainer}`}>
      {iconsData.map(({ Icon, name, link, col, to }, i) => (
        <li
          className={`col col-xl-2 col-sm-3 col-6 ${styles.iconWrapper}`}
          key={`icori-${i}`}
        >
          { to ? (
            <Link className={styles.link} to={to}>
              <Icon className={styles.icon} />
              <p className={'link'}>{name}</p>
            </Link>
          ) : (
            <a className={styles.link} href={link}>
              <Icon className={styles.icon} />
              <p className={'link'}>{name}</p>
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);
