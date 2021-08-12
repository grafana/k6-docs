import { I18N_CONFIG } from 'i18n/i18n-config';
import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';

export const LocaleContext = React.createContext(null);
export const useLocale = () => useContext(LocaleContext);

export default function LocaleProvider({ urlLocale = 'en', children }) {
  let initLocale =
    typeof localStorage !== 'undefined' && localStorage.getItem('k6-doc-locale')
      ? localStorage.getItem('k6-doc-locale')
      : urlLocale;

  if (I18N_CONFIG.hideLanguageToggle) {
    initLocale = urlLocale;
  }
  const curLocaleRef = useRef(initLocale);
  const [renderKey, setRenderKey] = useState({});

  useEffect(() => {
    if (I18N_CONFIG.hideLanguageToggle) {
      return;
    }

    if (
      typeof localStorage !== 'undefined' &&
      !localStorage.getItem('k6-doc-locale')
    ) {
      localStorage.setItem('k6-doc-locale', urlLocale);
    }
  }, [urlLocale]);

  const localeContextValue = useMemo(
    () => ({
      get locale() {
        return curLocaleRef.current;
      },
      urlLocale,
      setLocale: (locale) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('k6-doc-locale', locale);
        }
        curLocaleRef.current = locale;
        setRenderKey({});
      },
    }),
    [renderKey, urlLocale],
  );

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  );
}
