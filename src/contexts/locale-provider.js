import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';

export const LocaleContext = React.createContext(null);
export const useLocale = () => {
  return useContext(LocaleContext);
};

export default function LocaleProvider({ urlLocale = 'en', children }) {
  const initLocale =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('k6-doc-locale')
      : urlLocale;
  const curLocaleRef = useRef(initLocale);
  const [renderKey, setRenderKey] = useState({});

  console.log('LocaleProvider.render', { locale: curLocaleRef.current });

  useEffect(() => {
    console.log('LocaleProvider', { urlLocale });
    if (
      typeof localStorage !== 'undefined' &&
      !localStorage.getItem('k6-doc-locale')
    ) {
      console.log('LocaleProvider', 'setting LS');
      localStorage.setItem('k6-doc-locale', urlLocale);
    }
  }, [urlLocale]);

  const localeContextValue = useMemo(() => {
    return {
      get locale() {
        console.log('localeContextValue.get', { locale: curLocaleRef.current });
        return curLocaleRef.current;
      },
      urlLocale,
      setLocale: (locale) => {
        console.log('localeContextValue.set', {
          locale,
          curLocale: curLocaleRef.current,
        });
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
