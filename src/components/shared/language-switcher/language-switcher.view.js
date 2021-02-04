import classNames from 'classnames/bind';
import React from 'react';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from 'utils/utils.node';

import styles from './language-switcher.module.scss';

const cx = classNames.bind(styles);

export const LanguageSwitcher = (props) => {
  const { onLanguageChange, className } = props;

  const selectedLocale =
    localStorage.getItem('k6-doc-locale') || DEFAULT_LOCALE;

  return (
    <div className={cx('wrapper', className)}>
      {SUPPORTED_LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          className={`${styles.localeButton} ${
            locale === selectedLocale && styles.localeButtonActive
          }`}
          onClick={() => onLanguageChange(locale)}
        >
          {locale}
        </button>
      ))}
    </div>
  );
};
