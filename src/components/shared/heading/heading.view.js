import React from 'react';
import classNames from 'classnames';

import styles from './heading.module.scss';

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
