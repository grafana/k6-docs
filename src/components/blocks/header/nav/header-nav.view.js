import classNames from 'classnames/bind';
import { Link, withPrefix } from 'gatsby';
import React, { useState, useEffect } from 'react';

import { ItemWithSubmenu } from '../item-with-submenu/item-with-submenu.view';

import styles from './header-nav.module.scss';

// local helper function for checking
// if we should highlight javascript api link
export const isJsAPIActiveLink = (path) => {
  let isActiveLink = false;
  // check if window object is defined (we are in browser)
  if (typeof window !== 'undefined') {
    const givenPath = path.replace(/\/$/, '');
    // getting the same piece from window and removing possible trailing slash
    const actualPath = window.location.pathname.replace(/\/$/, '');

    // avoid highlighting k6 api link if k6 browser or jslib was selected
    if (actualPath.includes('javascript-api/jslib')) {
      isActiveLink =
        givenPath.includes('javascript-api/jslib') &&
        actualPath.includes(givenPath);
    } else {
      isActiveLink =
        !givenPath.includes('javascript-api/jslib') &&
        actualPath.includes(givenPath);
    }
  }
  return isActiveLink;
};

const Single = ({ to, label, sections }) => {
  let Component = null;
  if (to === '/') {
    const guidesPartiallyActive =
      typeof window !== 'undefined' &&
      !sections.some((sectionUrl) =>
        window.location.pathname.startsWith(sectionUrl),
      ) &&
      !/(\/docs)?\/javascript-api/.test(window.location.pathname) &&
      !/v\d\.\d{2}\/javascript-api/.test(window.location.pathname);
    Component = (
      <Link
        className={styles.link}
        to={to}
        activeClassName={styles.active}
        partiallyActive={guidesPartiallyActive}
      >
        {label}
      </Link>
    );
    return Component;
  }
  if (
    to === '/javascript-api/' &&
    typeof window !== 'undefined' &&
    /v\d\.\d{2}\/javascript-api/.test(window.location.pathname)
  ) {
    Component = (
      <Link
        className={classNames(styles.link, styles.active)}
        to={to}
        activeClassName={styles.active}
      >
        {label}
      </Link>
    );
    return Component;
  }
  if (to.startsWith('/')) {
    const isPartiallyActive =
      typeof window !== 'undefined' &&
      !/(\/docs)?\/cloud-rest-api/.test(window.location.pathname) &&
      !/v\d\.\d{2}\/javascript-api/.test(window.location.pathname);
    Component = (
      <Link
        className={styles.link}
        to={to}
        activeClassName={styles.active}
        partiallyActive={isPartiallyActive}
      >
        {label}
      </Link>
    );
    return Component;
  }
  Component = (
    <a className={styles.link} href={to}>
      {label}
    </a>
  );
  return Component;
};

export const HeaderNav = ({ links }) => {
  const cx = classNames.bind(styles);

  const [shouldBeHighlighted, setShouldBeHighlighted] = useState({
    check: () => false,
  });
  useEffect(() => {
    setShouldBeHighlighted({ check: isJsAPIActiveLink });
  }, []);

  return (
    <nav>
      <ul className={styles.list}>
        {links.map((link) => {
          // eslint-disable-next-line prefer-const
          let { label, to, submenu } = link;

          return (
            <li className={cx('item', 'itemDoc')} key={label + to}>
              {submenu ? (
                <ItemWithSubmenu
                  label={label}
                  submenu={submenu}
                  shouldBeHighlighted={shouldBeHighlighted}
                />
              ) : (
                <Single
                  label={label}
                  to={to}
                  sections={links
                    .filter((item) => item.to !== '/')
                    .map((item) => withPrefix(item.to))}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
