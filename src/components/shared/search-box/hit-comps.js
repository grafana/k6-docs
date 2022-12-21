import { Heading } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';

import styles from './search-box.module.scss';

const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

export const docPageHit =
  (clickHandler) =>
  ({ hit }) => {
    const hitTitleKey = hit.heading ? getKeyByValue(hit, hit.heading) : 'title';
    const hitContentKey = hit.excerpt
      ? getKeyByValue(hit, hit.excerpt)
      : 'content';

    return (
      <div>
        <Link
          to={`${hit.slug}`}
          onClick={clickHandler}
          className={styles.hitEntry}
        >
          <Heading
            tag={'h4'}
            size={'sm'}
            className={`link ${styles.hitHeading}`}
          >
            <Highlight attribute={hitTitleKey} hit={hit} tagName={'mark'} />
          </Heading>
        </Link>
        <Snippet
          attribute={hitContentKey}
          hit={hit}
          tagName={'mark'}
          className={styles.excerpt}
        />
      </div>
    );
  };
