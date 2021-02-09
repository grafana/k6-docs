import React, { useState, useEffect, useMemo } from 'react';

export const LocaleContext = React.createContext(null);
export const useLocale = () => {
  return React.useContext(LocaleContext);
};

export default function LocaleProvider({ urlLocale = 'en', children }) {
  const [curLocale, setCurLocale] = useState('en');
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
    // run on client side only
    const localeFromLS = localStorage.getItem('k6-doc-locale');
    setCurLocale(localeFromLS || urlLocale);
  }, []);

  const localeContextValue = useMemo(() => {
    return {
      locale: curLocale,
      urlLocale,
      setLocale: (locale) => {
        if (isClientSide) {
          localStorage.setItem('k6-doc-locale', locale);
        }
        setCurLocale(locale);
      },
    };
  }, [curLocale, urlLocale]);

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  );
}
