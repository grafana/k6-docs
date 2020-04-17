import React from 'react';
import { Link } from 'gatsby';
import { Heading } from 'components/shared/heading';
import styles from './doc-links-block.module.scss';

export const DocLinksBlock = ({ title, links, last }) => (
  <div className={`container ${styles.wrapper} ${last && styles.wrapper_last}`}>
    <Heading className={styles.title} tag={'h2'} size={'lg'}>
      {title}
    </Heading>
    <ul className={styles.linksWrapper}>
      {links.map(({ url, title, description, to }, i) => (
        <li className={styles.linkWrapper} key={`bl-${i}`}>
          {to ? (
            <Link className={styles.link} to={to}>
              <p className={styles.linkTitle}>{title}</p>
              <p className={styles.description}>{description}</p>
            </Link>
          ) : (
            <a className={styles.link} href={url}>
              <p className={styles.linkTitle}>{title}</p>
              <p className={styles.description}>{description}</p>
            </a>
          )}
        </li>
      ))}
    </ul>
  </div>
);
