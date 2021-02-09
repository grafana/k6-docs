import React from 'react';
import { localizedMessages } from 'utils/guides-translations';

import { useLocale } from './locale-provider';

export const I18nContext = React.createContext(null);
export const useI18n = () => {
  return React.useContext(I18nContext);
};

export default function I18nProvider({ children }) {
  const { locale } = useLocale();

  const i18nContextValue = React.useMemo(() => {
    return {
      t: (key) => {
        let msgLocalized = localizedMessages[locale][key];
        if (!msgLocalized) {
          console.warn(`i18n/[${locale}]: no localized message for ${key}`);
          msgLocalized = localizedMessages.en[key];
          if (!msgLocalized) {
            console.error(`i18n: no English message for ${key}`);
            msgLocalized = '???';
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
