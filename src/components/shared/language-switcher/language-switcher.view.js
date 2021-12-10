import { Dropdown } from 'components/shared/dropdown';
import { useLocale } from 'contexts/locale-provider';
import React from 'react';
import { SUPPORTED_LOCALES } from 'utils/utils.node';

export const LanguageSwitcher = (props) => {
  const { onLanguageChange, className } = props;

  const { locale } = useLocale();

  return (
    <Dropdown
      currentOption={locale}
      options={SUPPORTED_LOCALES.map((item) => ({
        label: item.toUpperCase(),
        value: item,
      }))}
      onChange={onLanguageChange}
      className={className}
    />
  );
};
