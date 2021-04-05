const path = require('path');

const queries = require('./src/utils/algolia');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const mainURL = process.env.GATSBY_DEFAULT_DOC_URL;
const isProduction = mainURL === 'https://k6.io/docs';

const shouldAnnouncementBannerBeShown = false;

const plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-resolve-src',
  'gatsby-transformer-json',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'k6',
      short_name: 'k6',
      start_url: '/',
      background_color: '#fff',
      theme_color: '#BADA55',
      display: 'minimal-ui',
      icon: './src/images/favicon.png',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: `${__dirname}/src/data/`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'markdown',
      path: `${__dirname}/src/data/markdown`,
    },
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md'],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-relative-images',
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 800,
            quality: 90,
            withWebp: true,
            disableBgImage: true,
            wrapperStyle: 'margin-left: 0;',
          },
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-google-fonts',
    options: {
      fonts: ['roboto mono:300,400'],
    },
  },
  {
    resolve: 'gatsby-plugin-svgr-svgo',
    options: {
      inlineSvgOptions: [
        {
          test: /\.inline.svg$/,
          svgoConfig: {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      ],
      urlSvgOptions: [
        {
          test: /\.svg$/,
          svgoConfig: {
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-sass',
    options: {
      additionalData:
        '@import "./src/styles/variables.scss", "./src/styles/mixins.scss";',
    },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
      exclude: [
        '/dev-404-page',
        '/404',
        '/404.html',
        '/offline-plugin-app-shell-fallback',
        '/getting-started/welcome',
        '/docs/getting-started/welcome',
      ],
      serialize: ({ site, allSitePage }) =>
        allSitePage.edges.map((edge) => {
          const value = site.siteMetadata.siteUrl + edge.node.path;
          return {
            url: value,
            changefreq: 'daily',
            priority: 0.7,
          };
        }),
    },
  },
];
if (process.env.GATSBY_DRIFT_API) {
  plugins.push({
    resolve: 'local-plugin-drift',
    options: {
      appId: process.env.GATSBY_DRIFT_API,
    },
  });
}

const autoCanonicalURL = false;
if (autoCanonicalURL) {
  plugins.push({
    resolve: `gatsby-plugin-react-helmet-canonical-urls`,
    options: {
      siteUrl: process.env.GATSBY_DEFAULT_MAIN_URL,
      noHash: true,
      noQueryString: true,
    },
  });
}

if (
  process.env.ALGOLIA_ADMIN_KEY &&
  process.env.GATSBY_ALGOLIA_APP_ID &&
  process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY
) {
  plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      enablePartialUpdates: true,
      matchFields: ['title', 'slug', 'content'],
      queries,
      chunkSize: 10000, // default: 1000
    },
  });
}

if (shouldAnnouncementBannerBeShown) {
  // See more on how it works:
  // https://github.com/loadimpact/new.k6.io/pull/102
  const options = {
    banner: {
      componentPath: path.join(
        __dirname,
        './src/components/shared/announcement-banner/announcement-banner.js',
      ),
      text:
        'Enhanced flexibility for multiple scenarios in your test. Check out the new Scenarios API.',
      link: 'https://k6.io/docs/using-k6/scenarios',
      buttonText: 'Learn more',
    },
    // settings below have to match
    // settings in other repos to avoid
    // unpredictable behavior
    cookie: {
      name: 'k6-announcement-banner-is-hidden',
      consentBannerCookieName: 'user-has-accepted-cookies',
      expiration: {
        days: 60,
      },
    },
    storage: {
      name: 'k6-ab-was-shown',
    },
  };
  if (isProduction) {
    // enabling GA in prod
    options.ga = {
      label: 'docs',
      action: 'Click',
      readMoreButtonCategory: 'BannerAnnouncementReadMore',
      dismissButtonCategory: 'BannerAnnouncementDismiss',
    };
  }

  plugins.push({
    resolve: 'gatsby-plugin-announcement-banner',
    options,
  });
}

if (isProduction) {
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: 'UA-158196577-1',
      head: false,
      cookieDomain: 'k6.io',
      allowLinker: true,
    },
  });

  plugins.push({
    resolve: '@sentry/gatsby',
    options: {
      dsn:
        'https://f46b8e24a5374539ba179e52835913e3@o175050.ingest.sentry.io/5289132',
      environment: 'production',
    },
  });
}

if (process.env.BUCKET_NAME) {
  plugins.push({
    resolve: `gatsby-plugin-s3`,
    options: {
      generateRedirectObjectsForPermanentRedirects: true,
      bucketName: process.env.BUCKET_NAME,
      region: process.env.BUCKET_REGION,
      protocol: 'https',
      hostname: isProduction ? 'k6.io' : 'staging.k6.io',
    },
  });
}

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || `/docs`,

  siteMetadata: {
    siteTitle:
      'Docs k6.io - Performance testing for developers, like unit-testing, for performance', // <title>
    shortSiteTitle: 'k6', // <title> ending for posts and pages
    siteDescription:
      // eslint-disable-next-line max-len
      'Docs k6 is an open source developer-centric load and performance regression testing tool for cloud native APIs, microservices and web sites/apps. Tests are written in ES6 JS with support for HTTP/1.1, HTTP/2.0 and WebSocket protocols.',
    siteImage: '/images/k6-cover-image.png',
    siteLanguage: 'en',
    siteUrl: process.env.GATSBY_DEFAULT_MAIN_URL,
    authorName: 'k6',
    authorTwitterAccount: '@k6_io',
  },
  plugins,
};
