import classNames from 'classnames/bind';
import { Button } from 'components/shared/button';
import { Heading } from 'components/shared/heading';
import { format } from 'date-fns';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { trimToLengthWithEllipsis } from 'utils';

import styles from './featured-post-card.module.scss';

const cx = classNames.bind(styles);

export const FeaturedPostCard = ({
  image,
  covertext,
  category,
  date,
  title,
  label,
  url,
  summary,
}) => (
  <div className={`container ${styles.wrapper} ${label}`}>
    <div className={cx('postCardWrapper', 'doc')}>
      <div className={cx('imageCol')}>
        {image ? (
          <GatsbyImage
            image={image}
            alt={title}
            className={cx('image', 'doc')}
          />
        ) : (
          <div className={cx('covertextWrapper', 'doc')}>
            <span className={cx('covertext')}>{covertext}</span>
          </div>
        )}
      </div>
      <div className={cx('infoCol')}>
        <div className={cx('props')}>
          {category && category !== 'none' && (
            <>
              <span className={cx('category')}>{category}</span> &mdash;{' '}
            </>
          )}
          <span className={cx('date')}>
            {format(new Date(date), 'dd MMMM yyyy')}
          </span>
        </div>
        <Heading tag={'h3'} className={cx('title', 'doc')}>
          {trimToLengthWithEllipsis(title, 120)}
        </Heading>
        <p className={cx('description')}>{trimToLengthWithEllipsis(summary)}</p>
        <Button
          className={cx('button')}
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
