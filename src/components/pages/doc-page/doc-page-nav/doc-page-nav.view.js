import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './doc-page-nav.module.scss';
import { getAnchorLinks } from 'utils';
import { Link } from 'gatsby';

export const DocPageNav = ({ content, label, currentPath, active = 0 }) => {
  const links = getAnchorLinks(content);

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    document.querySelector(anchor).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    // changing hash without default jumps to anchor
    if (history.pushState) {
      history.pushState(false, false, anchor);
    } else {
      // old browser support
      window.location.hash = anchor;
    }
  };

  return links.length ? (
    <nav className={`${styles.wrapper} ${label}`}>
      <ul className={styles.anchorWrapper}>
        {links.map(({ title, anchor }, i) => (
          <li className={styles.anchorBox} key={`al-${i}`}>
            <a
              className={classNames(styles.anchor)}
              href={`${anchor}`}
              onClick={e => handleAnchorClick(e, anchor)}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
};
