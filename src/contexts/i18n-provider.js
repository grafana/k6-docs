import { localizedMessages } from 'i18n/guides-translations';
import React from 'react';

import { useLocale } from './locale-provider';

export const I18nContext = React.createContext(null);
export const useI18n = () => {
  return React.useContext(I18nContext);
};

export default function I18nProvider({ children }) {
  const { locale } = useLocale();

  console.log('i18n locale', locale);

  const i18nContextValue = React.useMemo(() => {
    return {
      t: (key) => {
        let msgLocalized = localizedMessages[locale][key];
        if (!msgLocalized) {
          console.warn(`i18n/[${locale}]: no localized message for ${key}`);
          msgLocalized = localizedMessages.en[key];
          if (!msgLocalized) {
            throw new Error(`i18n: no English message for ${key}`);
          }
        }
        return msgLocalized;
      },
    };
  }, [locale]);

  return (
    <I18nContext.Provider value={i18nContextValue}>
      {children}
    </I18nContext.Provider>
  );
}
