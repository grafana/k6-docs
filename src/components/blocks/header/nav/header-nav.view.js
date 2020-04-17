import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames/bind';
import styles from './header-nav.module.scss';

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
            ) : to.startsWith('/') ? (
              <Link
                className={styles.link}
                to={to}
                activeClassName={styles.link_active}
              >
                {label}
              </Link>
            ) : (
              <a className={styles.link} href={to}>
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
