import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import React from 'react';
import Chevron from 'svg/chevron.inline.svg';

import styles from './doc-page-navigation.module.scss';

const cx = classNames.bind(styles);

const NavigationButton = ({ type, title, path }) => (
  <Link className={cx('item', type === 'next' ? 'next' : 'prev')} to={path}>
    <Chevron />
    <span className={styles.direction}>{type}</span>
    <span className={styles.name}>{title}</span>
  </Link>
);

export const DocPageNavigation = ({ prev, next, variant = 'default' }) => (
  <div className={cx('wrapper', variant === 'top-level' && 'top-level')}>
    {prev && (
      <NavigationButton type="previous" title={prev.title} path={prev.path} />
    )}
    {next && (
      <NavigationButton type="next" title={next.title} path={next.path} />
    )}
  </div>
);
