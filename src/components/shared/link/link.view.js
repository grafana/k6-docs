import React from 'react';
import { LATEST_VERSION } from 'utils/versioning';

export const Link =
  (version) =>
  ({ href, children, ...otherProps }) => {
    const newHref =
      version && version !== LATEST_VERSION && href.includes('/javascript-api/')
        ? href.replace('/javascript-api/', `/${version}/javascript-api/`)
        : href;

    return (
      <a href={newHref} {...otherProps}>
        {children}
      </a>
    );
  };
