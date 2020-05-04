import React from 'react';
import { Link } from 'gatsby';
import Logo from 'svg/logo.inline.svg';

import styles from './header-logo.module.scss';

import { main } from 'utils/urls';

export const HeaderLogo = ({ disableLink = false, theme = 'default' }) => {
  if (disableLink) {
    return <Logo className={styles.logo} />;
  } else if (theme === 'doc') {
    return (
      <Link className={`${styles.wrapper} ${styles.wrapper_doc}`} to={`/`}>
        <Logo className={styles.logo} />
        <span>docs</span>
      </Link>
    );
  }
  return (
    <a className={styles.wrapper} href={`${main}`}>
      <Logo className={styles.logo} />
    </a>
  );
};
