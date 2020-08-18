import classNames from 'classnames/bind';
import { Link, withPrefix } from 'gatsby';
import React from 'react';

import styles from './header-nav.module.scss';

// aux
const Submenu = ({ label, submenu }) => {
  return (
    <>
      <span
        className={classNames(styles.submenuTitle, styles.link, {
          [styles.link_active]: submenu.some(
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
};

const Single = ({ to, label, sections }) => {
  let Component = null;
  if (to === '/') {
    const guidesPartiallyActive =
      typeof window !== 'undefined' &&
      !sections.some((sectionUrl) =>
        window.location.pathname.startsWith(sectionUrl),
      );
    Component = (
      <Link
        className={styles.link}
        to={to}
        activeClassName={styles.link_active}
        partiallyActive={guidesPartiallyActive}
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
        activeClassName={styles.link_active}
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
        {links.map(({ label, to, submenu }) => (
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
        ))}
      </ul>
    </nav>
  );
};
