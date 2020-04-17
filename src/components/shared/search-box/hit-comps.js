import React from 'react';
import { Heading } from 'components/shared/heading';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import styles from './search-box.module.scss';

export const docPageHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`${hit.slug}`} onClick={clickHandler} className={styles.hitEntry}>
      <Heading tag={'h4'} size={'sm'} className={`link ${styles.hitHeading}`}>
        <Highlight attribute={'title'} hit={hit} tagName={'mark'} />
      </Heading>
    </Link>
    <Snippet
      attribute={'excerpt'}
      hit={hit}
      tagName={'mark'}
      className={styles.excerpt}
    />
  </div>
);
