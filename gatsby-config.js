const queries = require('./src/utils/algolia');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const mainURL = process.env.GATSBY_DEFAULT_MAIN_URL;
const isProduction = mainURL === 'https://k6.io';
const isStaging = mainURL === 'https://staging.k6.io';

const plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: `gatsby-plugin-react-helmet-canonical-urls`,
    options: {
      siteUrl: process.env.GATSBY_DEFAULT_MAIN_URL,
      noTrailingSlash: true,
    },
  },
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-plugin-resolve-src',
  'gatsby-transformer-json',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'k6',
      short_name: 'k6',
      start_url: '/',
      background_color: '#fff',
      theme_color: '',
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
          resolve: 'gatsby-remark-prismjs',
          options: {
            showLineNumbers: true,
          },
        },
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
    resolve: 'gatsby-plugin-sentry',
    options: {
      dsn:
        'https://f46b8e24a5374539ba179e52835913e3@o175050.ingest.sentry.io/5289132',
      // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
      environment: process.env.NODE_ENV,
      enabled: isProduction || isStaging,
      ignoreErrors: [
        // that's a real bug we have, but I'm ignoring it for now.
        'getBoundingClientRect',
        "Cannot read property 'getBoundingClientRect' of undefined",
        "TypeError: undefined is not an object (evaluating 'n.content.getBoundingClientRect')",
        'n.content is undefined', // same as above.
      ],
      denyUrls: [],
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
      includePaths: ['src/styles/variables.scss', 'src/styles/mixins.scss'],
      data:
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
      queries,
      chunkSize: 10000, // default: 1000
    },
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
}

if (process.env.BUCKET_NAME) {
  plugins.push({
    resolve: `gatsby-plugin-s3`,
    options: {
      bucketName: process.env.BUCKET_NAME,
      region: process.env.BUCKET_REGION,
      protocol: 'https',
      hostname: isProduction ? 'k6.io' : 'staging.k6.io',
    },
  });
}

module.exports = {
  pathPrefix: `/docs`,

  siteMetadata: {
    siteTitle:
      'Docs k6.io - Performance testing for developers, like unit-testing, for performance', // <title>
    shortSiteTitle: 'k6', // <title> ending for posts and pages
    siteDescription:
      // eslint-disable-next-line max-len
      'Docs k6 is an open source developer-centric load and performance regression testing tool for cloud native APIs, microservices and web sites/apps. Tests are written in ES6 JS with support for HTTP/1.1, HTTP/2.0 and WebSocket protocols.',
    siteImage: '/images/landscape-icon.png',
    siteLanguage: 'en',
    siteUrl: process.env.GATSBY_DEFAULT_MAIN_URL,
    authorName: 'k6',
    authorTwitterAccount: '@k6_io',
  },
  plugins,
};
