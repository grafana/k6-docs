import * as React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'gatsby';

import { Heading } from 'components/shared/heading';
import { styles as itemCardStyles } from 'components/shared/item-card';
import styles from './doc-welcome-whats-new.module.scss';
import docChangeImage from './doc-change.svg';

export const WhatsNew = () => {
  const item = {
    title: 'Documentation for our integration',
    text:
      'Our <strong>integration</strong> is now documented in our main docs!',
    date: new Date(2019, 6, 28),
  };

  const items = [item, item, item];

  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        What&apos;s new in the docs
      </Heading>

      <div className={itemCardStyles.wrapper}>
        {items.map(item => (
          <div className={`${itemCardStyles.content} ${styles.item}`}>
            <img
              className={styles.itemImage}
              src={docChangeImage}
              alt={'change'}
            />
            <div className={styles.itemContent}>
              <Heading className={styles.itemTitle} tag={'h3'} size={'md'}>
                {item.title}
              </Heading>
              <div
                className={styles.itemText}
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
            <span className={styles.itemDate}>
              {dateFormat(item.date, '— dd mmmm, yyyy')}
            </span>
          </div>
        ))}
        <div className={`${itemCardStyles.footer} ${styles.cardFooter}`}>
          <Link className={itemCardStyles.link} to={'/'}>
            See full changelog
          </Link>
        </div>
      </div>
    </section>
  );
};
