import { Dropdown } from 'components/shared/dropdown';
import { useLocale } from 'contexts/locale-provider';
import React from 'react';
import { SUPPORTED_LOCALES } from 'utils/utils.node';

export const LanguageSwitcher = (props) => {
  const { onLanguageChange, className } = props;

  const { locale } = useLocale();

  return (
    <Dropdown
      currentOption={locale.toUpperCase()}
      options={SUPPORTED_LOCALES.map((item) => item.toUpperCase())}
      onChange={onLanguageChange}
      className={className}
    />
  );
};
