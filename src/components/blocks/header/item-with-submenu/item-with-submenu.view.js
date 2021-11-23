import classNames from 'classnames/bind';
import React from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import styles from './item-with-submenu.module.scss';

export const ItemWithSubmenu = ({ label, submenu, shouldBeHighlighted }) => {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(submenu.length);

  return (
    <div className={styles.wrapper}>
      <span
        className={classNames(styles.submenuTitle, styles.link, {
          [styles.linkActive]: submenu.some(({ to: path }) => shouldBeHighlighted.check(path)),
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
      <div className={classNames(styles.submenuWrapper, { [styles.submenuOpen]: isOpen })}>
        <ul className={styles.submenu} role="menu">
          {submenu.map((item, i) => (
            <li key={`si-${i}`} className={styles.submenuItem} role="menuitem" tabIndex={i}>
              <a
                className={classNames(styles.link, {
                  [styles.linkActive]: shouldBeHighlighted.check(item.to),
                })}
                href={item.to}
                {...itemProps[i]}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
