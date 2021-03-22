import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import Logo from 'svg/logo.inline.svg';

import styles from './mobile-nav.module.scss';

export const MobileNav = ({ links, isVisible, onCloseButtonClick }) => {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper_visible]: isVisible,
      })}
    >
      <div className={styles.topSection}>
        <div className={'container'}>
          <div className={'row d-flex align-items-center'}>
            <div className={'col-3'}>
              <Link to={'/'}>
                <Logo className={styles.logo} />
              </Link>
            </div>
            <div className={'col-9 d-flex justify-content-end'}>
              <button
                className={styles.closeButton}
                type="button"
                onClick={onCloseButtonClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <ul className={styles.list}>
          {links.map((link) => {
            // eslint-disable-next-line prefer-const
            let { label, to } = link;

            return (
              <li className={styles.listItem} key={label || to}>
                <Link className={styles.listLink} to={to}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
