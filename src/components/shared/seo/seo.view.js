import { useStaticQuery, graphql } from 'gatsby';
import { I18N_CONFIG } from 'i18n/i18n-config';
import React from 'react';
import { Helmet } from 'react-helmet';
import { createMetaImagePath } from 'utils';
import { docs } from 'utils/urls';

export const SEO = ({
  data: { title, description, image, slug } = {},
  facebook,
  pageTranslations = {},
} = {}) => {
  const {
    site: {
      siteMetadata: {
        siteTitle,
        siteDescription,
        siteUrl,
        siteImage,
        siteLanguage,
        authorTwitterAccount,
      },
    },
  } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteImage
          siteLanguage
          authorTwitterAccount
        }
      }
    }
  `);
  const currentTitle = title || siteTitle;
  const currentDescription = description || siteDescription;
  const currentUrl = slug ? `${docs}/${slug}` : docs;
  const currentImage = createMetaImagePath(image, siteUrl, siteImage);

  const hrefLangAttributes = {
    en: { rel: 'alternate', href: `${siteUrl}/docs` },
    es: { rel: 'alternate', href: `${siteUrl}/docs` },
  };

  if (pageTranslations) {
    let esPathname = pageTranslations.es.path;
    let enPathname = pageTranslations.en.path;

    if (esPathname.endsWith('/')) {
      // gatsby-plugin-react-helmet-canonical-urls.noTrailingSlash
      esPathname = esPathname.substring(0, esPathname.length - 1);
    }
    if (enPathname.endsWith('/')) {
      // gatsby-plugin-react-helmet-canonical-urls.noTrailingSlash
      enPathname = enPathname.substring(0, enPathname.length - 1);
    }
    hrefLangAttributes.es.href += esPathname;
    hrefLangAttributes.en.href += enPathname;

    // if  no pageTranslations, we must enable `gatsby-plugin-react-helmet-canonical-urls`
  }

  // we have to setup the `canonical` URL with `hreflang`.
  // we must do it here because `gatsby-plugin-react-helmet-canonical-urls` does not cover this case
  if (slug && (slug.startsWith('es/') || slug === 'es')) {
    hrefLangAttributes.es.rel = 'canonical';
  } else {
    hrefLangAttributes.en.rel = 'canonical';
  }

  return (
    <>
      {I18N_CONFIG.hideEsFromRobots &&
        slug &&
        (slug.startsWith('es/') || slug === 'es') && (
          <Helmet meta={[{ name: 'robots', content: 'noindex' }]} />
        )}
      <Helmet
        title={currentTitle}
        htmlAttributes={{
          lang: siteLanguage,
          prefix: 'og: http://ogp.me/ns#',
        }}
      >
        {/* General */}
        <meta name={'description'} content={currentDescription} />
        {/* Open Graph */}
        <meta property={'og:url'} content={currentUrl} />
        <meta property={'og:title'} content={currentTitle} />
        <meta property={'og:description'} content={currentDescription} />
        <meta property={'og:image'} content={currentImage} />
        <meta property={'og:type'} content={'website'} />
        {facebook && <meta property={'fb:app_id'} content={facebook.appId} />}
        {/* Twitter Card tags */}
        <meta name={'twitter:card'} content={'summary'} />
        <meta name={'twitter:creator'} content={authorTwitterAccount} />

        {/* SEO for localized pages */}
        {/* rel should be declared after href https://github.com/nfl/react-helmet/issues/279 */}
        {pageTranslations && pageTranslations.en !== undefined && (
          <link
            hrefLang="en"
            href={`${hrefLangAttributes.en.href}`}
            rel={`${hrefLangAttributes.en.rel}`}
          />
        )}
        {pageTranslations && pageTranslations.es !== undefined && (
          <link
            hrefLang="es"
            href={`${hrefLangAttributes.es.href}`}
            rel={`${hrefLangAttributes.es.rel}`}
          />
        )}
        {pageTranslations && (
          <link
            hrefLang="x-default"
            href={`${hrefLangAttributes.en.href}`}
            rel="alternate"
          />
        )}
      </Helmet>
    </>
  );
};
