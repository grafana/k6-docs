import classNames from 'classnames/bind';
import { isJsAPIActiveLink } from 'components/blocks/header/nav/header-nav.view';
import { Link, withPrefix } from 'gatsby';
import React, { useState } from 'react';

import styles from './sidebar-section-dropdown.module.scss';

const cx = classNames.bind(styles);

const formatLabel = (label) => {
  let newLabel = `${label[0].toUpperCase()}${label.substr(1).toLowerCase()}`;
  newLabel = newLabel.replace('K6', 'k6');
  newLabel = newLabel.replace('Xk6', 'xk6');
  newLabel = newLabel.replace('api', 'API');
  return newLabel;
};

export const SidebarSectionDropdown = ({ links, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  // flatten links
  const flatLinks = [];
  links.forEach((item) => {
    flatLinks.push({
      label: formatLabel(item.label),
      to: withPrefix(item.to),
      disabled: item.submenu,
      isSubmenu: false,
    });

    if (item.submenu) {
      item.submenu.forEach((submenuItem) => {
        flatLinks.push({
          label: formatLabel(submenuItem.label),
          to: withPrefix(submenuItem.to),
          isSubmenu: true,
          disabled: false,
        });
      });
    }
  });

  const flatLinksWithoutGuides = flatLinks.filter((item) => item.to !== '/');
  const jsApiLinks = flatLinks.filter(
    (item) =>
      item.isSubmenu &&
      (/(\/docs)?\/javascript-api/.test(item.to) ||
        /v\d\.\d{2}\/javascript-api/.test(item.to)),
  );

  let currentSection = flatLinks[0].label;

  if (typeof window !== 'undefined') {
    if (
      /(\/docs)?\/javascript-api/.test(window.location.pathname) ||
      /v\d\.\d{2}\/javascript-api/.test(window.location.pathname)
    ) {
      jsApiLinks.forEach((item) => {
        if (isJsAPIActiveLink(item.to)) {
          currentSection = item.label;
        }
      });
    } else if (
      flatLinksWithoutGuides.some(({ to }) =>
        window.location.pathname.startsWith(to),
      )
    ) {
      currentSection = flatLinksWithoutGuides.find(({ to }) =>
        window.location.pathname.startsWith(to),
      ).label;
    }
  }

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
        {currentSection && <span>{currentSection}</span>}
      </button>
      {isOpen && (
        <ul className={cx('menu')}>
          {flatLinks.map(({ label, to, disabled, isSubmenu }) => (
            <li className={cx('item', isSubmenu && 'submenu')}>
              {!disabled ? (
                <Link
                  className={cx('link', disabled && 'disabled')}
                  to={to}
                  activeClassName={styles.active}
                >
                  {label}
                </Link>
              ) : (
                <span className={cx('link', disabled && 'disabled')}>
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
