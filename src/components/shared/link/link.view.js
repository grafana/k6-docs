import React from 'react';

export const Link = (version) => ({ href, children, ...otherProps }) => {
  const newHref =
    version && href.startsWith('/javascript-api/')
      ? `/${version}${href}`
      : href;

  return (
    <a href={newHref} {...otherProps}>
      {children}
    </a>
  );
};
