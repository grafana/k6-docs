exports.onRenderBody = ({ pathname, setHtmlAttributes }) => {
  let currentLanguage = 'en';

  if (pathname.startsWith('/es/')) {
    currentLanguage = 'es';
  }

  setHtmlAttributes({ lang: currentLanguage, prefix: 'og: http://ogp.me/ns#' });
};
