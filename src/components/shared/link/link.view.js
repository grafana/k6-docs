import React from 'react';
import { LATEST_VERSION } from 'utils/versioning';

import styles from './link.module.scss';
import ExternalIcon from './svg/exnternal-link-icon.inline.svg';

export const Link =
  (version) =>
  ({ href, children, ...otherProps }) => {
    const newHref =
      version && version !== LATEST_VERSION && href.includes('/javascript-api/')
        ? href.replace('/javascript-api/', `/${version}/javascript-api/`)
        : href;

    return href.startsWith('http') && !href.includes('k6.io/') ? (
      <a
        className={styles.external}
        href={newHref}
        target="_blank"
        rel="noreferrer"
        {...otherProps}
      >
        {children}
        <ExternalIcon />
      </a>
    ) : (
      <a href={newHref} {...otherProps}>
        {children}
      </a>
    );
  };
