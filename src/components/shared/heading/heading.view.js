import classNames from 'classnames';
import React from 'react';
import { slugify } from 'utils';

import styles from './heading.module.scss';
import AnchorIcon from './svg/anchor.inline.svg';

export const Heading = ({ className, id, tag = 'h1', size, children }) => {
  const wrapperClassName = classNames(
    styles.wrapper,
    { [styles.wrapper_size_lg]: size === 'lg' },
    { [styles.wrapper_size_md]: size === 'md' },
    { [styles.wrapper_size_sm]: size === 'sm' },
    { [styles.wrapper_size_xs]: size === 'xs' },
    className,
  );

  return React.createElement(
    tag,
    { className: wrapperClassName, id },
    children,
  );
};

export const HeadingLandmark = (Tag) => ({ children }) => {
  const getPlainText = (arr) =>
    arr.reduce((acc, cur) => acc.concat(cur.props?.children ?? cur), '');
  const textContent = Array.isArray(children)
    ? getPlainText(children)
    : children;
  return (
    <Tag
      className={styles.markHeading}
      id={`${slugify(textContent)
        .replace(/\//g, '-')
        .replace(/^\d+/g, '')
        .replace(/^-*/g, '')
        .replace(/-*$/g, '')}`}
    >
      <a
        className={'anchor-icon'}
        href={`#${slugify(textContent)
          .replace(/\//g, '-')
          .replace(/^\d+/g, '')
          .replace(/^-*/g, '')
          .replace(/-*$/g, '')}`}
      >
        <AnchorIcon />
      </a>
      {children}
    </Tag>
  );
};
