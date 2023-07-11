import { useStaticQuery, graphql } from 'gatsby';
import { I18N_CONFIG } from 'i18n/i18n-config';
import React, { useEffect, useRef } from 'react';
import { createMetaImagePath, noTrailingSlash, addPrefixSlash } from 'utils';
import { docs } from 'utils/urls';
import { LATEST_VERSION } from 'utils/versioning';

const getPageHref = (host, slug) => {
  if (slug.match(/^\/?xk6-disruptor\/.*/g) || slug.match(/^\/?jslib\/.*/g)) {
    return `${noTrailingSlash(host)}/javascript-api${addPrefixSlash(slug)}`;
  }

  return `${noTrailingSlash(host)}${addPrefixSlash(slug)}`;
};

export const SEO = ({
  data: { title, description, image, slug, canonicalUrl, robots } = {},
  facebook,
  pageTranslations = null,
  pageVersions = null,
  version = LATEST_VERSION,
} = {}) => {
  const {
    site: {
      siteMetadata: {
        siteTitle,
        siteDescription,
        siteUrl,
        siteImage,
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
          authorTwitterAccount
        }
      }
    }
  `);

  const currentTitle = title || siteTitle;
  const currentDescription = description || siteDescription;
  const currentUrl = slug && slug !== '*' ? getPageHref(docs, slug) : docs;
  const currentRobotsContent = useRef('index, follow');
  let versionedCanonicalUrl = currentUrl;
  let currentLanguage = 'en';

  if ((slug && slug.startsWith('es/')) || (slug && slug.startsWith('/es/'))) {
    currentLanguage = 'es';
  }

  // set canonical path to latest version URL if it's available
  if (pageVersions && typeof pageVersions[LATEST_VERSION] !== 'undefined') {
    versionedCanonicalUrl = `${docs}${pageVersions[LATEST_VERSION].path}`;
  }

  if (canonicalUrl) {
    versionedCanonicalUrl = canonicalUrl;
  }

  const currentImage = createMetaImagePath(image, siteUrl, siteImage);

  const hrefLangAttributes = {
    en: { href: `${siteUrl}/docs` },
    es: { href: `${siteUrl}/docs` },
  };

  useEffect(() => {
    if (
      I18N_CONFIG.hideEsFromRobots &&
      slug &&
      (slug.startsWith('es/') || slug === 'es')
    ) {
      currentRobotsContent.current = 'noindex';
    }
  }, []);

  if (robots) {
    currentRobotsContent.current = robots;
  }

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
      <title>{currentTitle}</title>
      {/* General */}
      <meta name={'description'} content={currentDescription} />
      <meta name={'robots'} content={currentRobotsContent.current} />
      {/* Open Graph */}
      <meta property={'og:url'} content={currentUrl} />
      <meta property={'og:title'} content={currentTitle} />
      <meta property={'og:description'} content={currentDescription} />
      <meta property={'og:image'} content={currentImage} />
      <meta property={'og:type'} content={'website'} />
      {facebook ? (
        <meta property={'fb:app_id'} content={facebook.appId} />
      ) : null}
      {/* Twitter Card tags */}
      <meta name={'twitter:card'} content={'summary'} />
      <meta name={'twitter:creator'} content={authorTwitterAccount} />

      <meta name="docsearch:language" content={currentLanguage} />
      <meta name="docsearch:version" content={version} />

      {/* Canonical links for versioned pages */}
      <link href={versionedCanonicalUrl} rel="canonical" />

      {/* SEO for localized pages */}
      {/* rel should be declared after href https://github.com/nfl/react-helmet/issues/279 */}
      {pageTranslations?.en && (
        <link
          hrefLang="en"
          href={`${hrefLangAttributes.en.href}`}
          rel="alternate"
        />
      )}
      {pageTranslations?.es && (
        <link
          hrefLang="es"
          href={`${hrefLangAttributes.es.href}`}
          rel="alternate"
        />
      )}
      {pageTranslations?.en && (
        <link
          hrefLang="x-default"
          href={`${hrefLangAttributes.en.href}`}
          rel="alternate"
        />
      )}
    </>
  );
};
