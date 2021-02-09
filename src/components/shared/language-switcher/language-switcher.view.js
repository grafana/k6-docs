import classNames from 'classnames/bind';
import { useLocale } from 'contexts/locale-provider';
import React from 'react';
import { SUPPORTED_LOCALES } from 'utils/utils.node';

import styles from './language-switcher.module.scss';

const cx = classNames.bind(styles);

export const LanguageSwitcher = (props) => {
  const { onLanguageChange, className } = props;

  const { locale } = useLocale();

  return (
    <div className={cx('wrapper', className)}>
      {SUPPORTED_LOCALES.map((lang) => (
        <button
          key={locale}
          type="button"
          className={`${styles.localeButton} ${
            lang === locale && styles.localeButtonActive
          }`}
          onClick={() => onLanguageChange(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
