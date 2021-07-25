import classNames from 'classnames/bind';
import { useLocale } from 'contexts/locale-provider';
import { Link } from 'gatsby';
import React from 'react';
import Logo from 'svg/logo-with-grafana-labs.inline.svg';
import { main } from 'utils/urls';

import styles from './header-logo.module.scss';

const cx = classNames.bind(styles);

const LOGO_LINK = {
  en: '/',
  es: '/es',
};

export const HeaderLogo = ({ disableLink = false, theme = 'default' }) => {
  const { locale } = useLocale();

  if (disableLink) {
    return <Logo className={cx('logo')} />;
  }
  if (theme === 'doc') {
    return (
      <Link className={cx('wrapper', 'doc')} to={LOGO_LINK[locale]}>
        <Logo className={cx('logo')} />
        <span>docs</span>
      </Link>
    );
  }
  return (
    <a className={cx('wrapper')} href={`${main}`}>
      <Logo className={cx('logo')} />
    </a>
  );
};
