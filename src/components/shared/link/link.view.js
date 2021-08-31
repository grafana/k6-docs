import React from 'react';

export const Link = (version) => ({ href, children, ...otherProps }) => {
  const newHref =
    version && href.includes('/javascript-api/')
      ? href.replace('/javascript-api/', `/${version}/javascript-api/`)
      : href;

  return (
    <a href={newHref} {...otherProps}>
      {children}
    </a>
  );
};
