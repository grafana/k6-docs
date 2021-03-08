import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';

export const LocaleContext = React.createContext(null);
export const useLocale = () => {
  return useContext(LocaleContext);
};

export default function LocaleProvider({ urlLocale = 'en', children }) {
  const initLocale =
    typeof localStorage !== 'undefined' && localStorage.getItem('k6-doc-locale')
      ? localStorage.getItem('k6-doc-locale')
      : urlLocale;
  const curLocaleRef = useRef(initLocale);
  const [renderKey, setRenderKey] = useState({});

  useEffect(() => {
    if (
      typeof localStorage !== 'undefined' &&
      !localStorage.getItem('k6-doc-locale')
    ) {
      localStorage.setItem('k6-doc-locale', urlLocale);
    }
  }, [urlLocale]);

  const localeContextValue = useMemo(() => {
    return {
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
    };
  }, [renderKey, urlLocale]);

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  );
}
