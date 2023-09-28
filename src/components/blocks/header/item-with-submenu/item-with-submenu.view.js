import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import React from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import styles from './item-with-submenu.module.scss';
import ExternalIcon from './svg/exnternal-link-icon.inline.svg';

export const ItemWithSubmenu = ({ label, submenu, shouldBeHighlighted }) => {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(submenu.length);

  return (
    <div className={styles.wrapper}>
      <span
        className={classNames(styles.submenuTitle, styles.link, {
          [styles.active]: submenu.some(({ to: path }) =>
            shouldBeHighlighted.check(path),
          ),
        })}
        tabIndex="0"
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={label}
        {...buttonProps}
      >
        {label}
      </span>
      <div
        className={classNames(styles.submenuWrapper, {
          [styles.submenuOpen]: isOpen,
        })}
      >
        <ul className={styles.submenu} role="menu">
          {submenu.map((item, i) => (
            <li
              key={`si-${i}`}
              className={styles.submenuItem}
              role="menuitem"
              tabIndex={i}
            >
              <Link
                className={classNames(styles.link, {
                  [styles.active]: shouldBeHighlighted.check(item.to),
                })}
                to={item.to}
                {...itemProps[i]}
              >
                {item.label}
                {item.to.startsWith('http') && !item.to.includes('k6.io/') && (
                  <ExternalIcon />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
