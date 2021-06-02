import classNames from 'classnames';
import { HeadingLandmark } from 'components/shared/heading';
import { useLandmark, useElementsReplacement } from 'hooks';
import React, { forwardRef } from 'react';

import styles from './table-of-contents.module.scss';

const components = {
  h2: HeadingLandmark('h2'),
  // uncomment the next line to add h3 to ToC
  // h3: HeadingLandmark('h3'),
};

const TableOfContents = forwardRef(
  (
    { style, label, contentContainerRef, shouldMakeReplacement = false },
    ref,
  ) => {
    useElementsReplacement({
      containerRef: contentContainerRef,
      components,
      shouldMakeReplacement,
    });
    const links = useLandmark(
      {
        containerRef: contentContainerRef,
        markSelector: 'h2', // replace to 'h2, h3' to include h3 in ToC
      },
      [],
    );
    const handleAnchorClick = (e, anchor) => {
      e.preventDefault();
      document.querySelector(anchor).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // changing hash without default jumps to anchor
      // eslint-disable-next-line no-restricted-globals
      if (history.pushState) {
        // eslint-disable-next-line no-restricted-globals
        history.pushState(false, false, anchor);
      } else {
        // old browser support
        window.location.hash = anchor;
      }
    };

    return (
      <div
        style={style}
        className={`${styles.anchorBarWrapper} ${
          !links.length && styles.hidden
        }`}
        ref={ref}
      >
        <nav className={`${styles.anchorBar} ${label ?? ''}`}>
          <ul className={styles.anchorWrapper}>
            {links.map(({ title, anchor, tagName }, i) => (
              <li className={styles.anchorBox} key={`al-${i}`}>
                <a
                  className={
                    tagName === 'H2'
                      ? classNames(styles.h2)
                      : classNames(styles.h3)
                  }
                  href={`${anchor}`}
                  onClick={(e) => handleAnchorClick(e, anchor)}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  },
);

export default TableOfContents;
