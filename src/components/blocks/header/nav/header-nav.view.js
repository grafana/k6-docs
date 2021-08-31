import classNames from 'classnames/bind';
import { Link, withPrefix } from 'gatsby';
import React from 'react';

import styles from './header-nav.module.scss';

// aux
const Submenu = ({ label, submenu }) => (
  <>
    <span
      className={classNames(styles.submenuTitle, styles.link, {
        [styles.active]: submenu.some(
          ({ to: path }) =>
            typeof window !== 'undefined' &&
            window.location.pathname.replace(/\/?$/, '') === path,
        ),
      })}
    >
      {label}
    </span>
    <div className={styles.submenuWrapper}>
      <ul className={styles.submenu}>
        {submenu.map((item, i) => (
          <li key={`si-${i}`} className={styles.submenuItem}>
            {item.to.startsWith('/') ? (
              <Link className={styles.link} to={item.to}>
                {item.label}
              </Link>
            ) : (
              <a className={styles.link} href={item.to}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
);

const Single = ({ to, label, sections }) => {
  let Component = null;
  if (to === '/') {
    const guidesPartiallyActive =
      typeof window !== 'undefined' &&
      !sections.some((sectionUrl) =>
        window.location.pathname.startsWith(sectionUrl),
      ) &&
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
      !/(\/docs)?\/cloud-rest-api/.test(window.location.pathname);
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

  return (
    <nav>
      <ul className={styles.list}>
        {links.map((link) => {
          // eslint-disable-next-line prefer-const
          let { label, to, submenu } = link;

          return (
            <li
              className={cx('item', 'itemDoc', { withSubmenu: !!submenu })}
              key={label + to}
            >
              {submenu ? (
                <Submenu label={label} submenu={submenu} />
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
