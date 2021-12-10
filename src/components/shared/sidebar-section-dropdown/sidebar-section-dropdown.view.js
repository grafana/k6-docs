import classNames from 'classnames';
import { Link, navigate, withPrefix } from 'gatsby';
import {
  isJsAPIActiveLink,
  Single,
} from 'components/blocks/header/nav/header-nav.view';
import React, { useState, useEffect } from 'react';

import styles from './sidebar-section-dropdown.module.scss';

const cx = classNames.bind(styles);

const ItemWithSubmenu = ({ label, submenu, shouldBeHighlighted }) => (
  <>
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
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export const SidebarSectionDropdown = ({ links, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [shouldBeHighlighted, setShouldBeHighlighted] = useState({
    check: () => false,
  });
  useEffect(() => {
    setShouldBeHighlighted({ check: isJsAPIActiveLink });
  }, []);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={classNames(
          styles.current,
          isOpen ? styles.currentOpen : styles.currentClose,
        )}
      >
        {/*currentVersion && <span>{currentVersion}</span>*/}
      </button>
      {isOpen && (
        <ul className={styles.menu}>
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
      )}
    </div>
  );
};
