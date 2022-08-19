import { useStaticQuery, graphql } from 'gatsby';
import { I18N_CONFIG } from 'i18n/i18n-config';
import React from 'react';
import { Helmet } from 'react-helmet';
import { createMetaImagePath } from 'utils';
import { docs } from 'utils/urls';
import { LATEST_VERSION } from 'utils/versioning';

export const SEO = ({
  data: { title, description, image, slug } = {},
  facebook,
  pageTranslations = null,
  pageVersions = null,
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
  const currentUrl =
    // eslint-disable-next-line no-nested-ternary
    slug && slug !== '*'
      ? slug.startsWith('jslib/')
        ? `${docs}/javascript-api${slug}`
        : `${docs}${slug.startsWith('/') ? slug : `/${slug}`}`
      : docs;

  let versionedCanonicalUrl = currentUrl;
  // set canonical path to latest version URL if it's available
  if (pageVersions && typeof pageVersions[LATEST_VERSION] !== 'undefined') {
    versionedCanonicalUrl = `${docs}${pageVersions[LATEST_VERSION].path}`;
  }

  const currentImage = createMetaImagePath(image, siteUrl, siteImage);

  const hrefLangAttributes = {
    en: { href: `${siteUrl}/docs` },
    es: { href: `${siteUrl}/docs` },
  };

  if (pageTranslations) {
    if (pageTranslations.es) {
      let esPathname = pageTranslations.es.path;
      // make sure each link has trailing slash
      if (!esPathname.endsWith('/')) {
        esPathname = `${esPathname}/`;
      }
      hrefLangAttributes.es.href += esPathname;
    }

    if (pageTranslations.en) {
      let enPathname = pageTranslations.en.path;
      // make sure each link has trailing slash
      if (!enPathname.endsWith('/')) {
        enPathname = `${enPathname}/`;
      }

      hrefLangAttributes.en.href += enPathname;
    }
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
          lang: slug && slug.startsWith('es/') ? 'es' : siteLanguage,
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

        {/* Canonical links for versioned pages */}
        <link href={versionedCanonicalUrl} rel="canonical" />

        {/* SEO for localized pages */}
        {/* rel should be declared after href https://github.com/nfl/react-helmet/issues/279 */}
        {pageTranslations && pageTranslations.en !== undefined && (
          <link
            hrefLang="en"
            href={`${hrefLangAttributes.en.href}`}
            rel="alternate"
          />
        )}
        {pageTranslations && pageTranslations.es && (
          <link
            hrefLang="es"
            href={`${hrefLangAttributes.es.href}`}
            rel="alternate"
          />
        )}
        {pageTranslations && pageTranslations.en && (
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
