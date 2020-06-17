import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './table-of-contents.module.scss';
import { useLandmark } from 'hooks';

const TableOfContents = forwardRef(
  ({ style, contentContainerSelector, label }, ref) => {
    const { links } = useLandmark({
      containerSelector: contentContainerSelector,
      markSelector: 'h2',
    });
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
      <div style={style} className={styles.anchorBarWrapper} ref={ref}>
        <nav className={`${styles.anchorBar} ${label ?? ''}`}>
          <ul className={styles.anchorWrapper}>
            {links.map(({ title, anchor }, i) => (
              <li className={styles.anchorBox} key={`al-${i}`}>
                <a
                  className={classNames(styles.anchor)}
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
    ) : null;
  },
);

export default TableOfContents;
