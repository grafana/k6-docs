import { useLocale } from 'contexts/locale-provider';
import { Link } from 'gatsby';
import React from 'react';
import Logo from 'svg/logo.inline.svg';
import { main } from 'utils/urls';

import styles from './header-logo.module.scss';

const LOGO_LINK = {
  en: '/',
  es: '/es',
};

export const HeaderLogo = ({ disableLink = false, theme = 'default' }) => {
  const { locale } = useLocale();

  if (disableLink) {
    return <Logo className={styles.logo} />;
  }
  if (theme === 'doc') {
    return (
      <Link
        className={`${styles.wrapper} ${styles.wrapper_doc}`}
        to={LOGO_LINK[locale]}
      >
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
