import classNames from 'classnames';
import { Button } from 'components/shared/button';
import { Heading } from 'components/shared/heading';
import { format } from 'date-fns';
import Img from 'gatsby-image';
import React from 'react';
import { trimToLengthWithEllipsis } from 'utils';

import styles from './featured-post-card.module.scss';

export const FeaturedPostCard = ({
  gatsbyImageData,
  covertext,
  category,
  date,
  title,
  label,
  url,
  summary,
}) => (
  <div className={`container ${styles.wrapper} ${label}`}>
    <div
      className={classNames(styles.postCardWrapper, styles.postCardWrapper_doc)}
    >
      <div className={styles.imageCol}>
        {gatsbyImageData ? (
          <Img
            fluid={gatsbyImageData}
            alt={title}
            className={classNames(styles.image, styles.image_doc)}
          />
        ) : (
          <div
            className={classNames(
              styles.covertextWrapper,
              styles.covertextWrapper_doc,
            )}
          >
            <span className={styles.covertext}>{covertext}</span>
          </div>
        )}
      </div>
      <div className={`${styles.infoCol}`}>
        <div className={styles.props}>
          {category && category !== 'none' && (
            <>
              <span className={styles.category}>{category}</span> &mdash;{' '}
            </>
          )}
          <span className={styles.date}>
            {format(new Date(date), 'dd MMMM yyyy')}
          </span>
        </div>
        <Heading
          tag={'h3'}
          className={classNames(styles.title, styles.title_doc)}
        >
          {trimToLengthWithEllipsis(title, 120)}
        </Heading>
        <p className={styles.description}>
          {trimToLengthWithEllipsis(summary)}
        </p>
        <Button
          className={styles.button}
          tag={'a'}
          href={`${process.env.GATSBY_DEFAULT_BLOG_URL}/${url}`}
          cursor
        >
          Read more
        </Button>
      </div>
    </div>
  </div>
);
