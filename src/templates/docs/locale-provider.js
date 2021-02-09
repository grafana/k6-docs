import React from 'react';

export const LocaleContext = React.createContext(null);
export const useLocale = () => {
  return React.useContext(LocaleContext);
};

export default function LocaleProvider({ urlLocale = 'en', children }) {
  const localeFromLS = localStorage.getItem('k6-doc-locale');
  const [curLocale, setCurLocale] = React.useState(localeFromLS || urlLocale);

  const localeContextValue = React.useMemo(() => {
    return {
      locale: curLocale,
      urlLocale,
      setLocale: (locale) => {
        localStorage.setItem('k6-doc-locale', locale);
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
