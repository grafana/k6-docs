import classNames from 'classnames/bind';
import React from 'react';

import styles from './language-switcher.module.scss';

const SUPPORTED_LOCALES = ['en', 'es'];

const cx = classNames.bind(styles);

export const LanguageSwitcher = (props) => {
  const { onLanguageChange, className } = props;

  const selectedLocale = localStorage.getItem('k6-doc-locale') || 'en';

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
