/* eslint-disable max-len */
const Path = require('path');

const { translations } = require('./src/utils/path-translations');
const {
  slugify,
  compose,
  childrenToList,
  stripDirectoryPath,
} = require('./src/utils/utils');
const {
  SUPPORTED_LOCALES,
  removeLocaleFromPath,
  pathCollisionDetector,
  buildFileTree,
  buildFileTreeNode,
  getChildSidebar,
  unorderify,
  getDocSection,
  buildBreadcrumbs,
  removeGuides,
  dedupePath,
  removeGuidesAndRedirectWelcome,
  noTrailingSlash,
} = require('./src/utils/utils.node');

/* constants */
// auxilary flag to determine the environment (staging/prod)
const isProduction =
  process.env.GATSBY_DEFAULT_DOC_URL === 'https://k6.io/docs';

// @TODO: remove this after the porting of cloud rest api
// section will be finished
const replaceRestApiRedirect = ({ isProduction, title, redirect }) => {
  if (!isProduction && title === 'Cloud REST API') {
    const docUrl = process.env.GATSBY_DEFAULT_DOC_URL;
    const domain = docUrl.includes('8000') ? `` : `/docs`;
    return `${domain}/cloud-rest-api/introduction`;
  }
  return redirect;
};

// path + title
const getSlug = (relativeDirectory, title, type = 'guides') => {
  const strippedDirectory = stripDirectoryPath(relativeDirectory, type);
  const path = `${strippedDirectory}/${title.replace(/\//g, '-')}`;
  const slug = compose(
    noTrailingSlash,
    dedupePath,
    removeGuides,
    unorderify,
    slugify,
  )(path);

  return slug;
};
// translated path + title
const getTranslatedSlug = (
  relativeDirectory,
  title,
  locale = 'es',
  type = 'guides',
) => {
  const strippedDirectory = stripDirectoryPath(relativeDirectory, type);
  const path = unorderify(strippedDirectory);
  const translatedPath = path
    .split('/')
    .map((part) =>
      translations[part] !== undefined ? translations[part][locale] : part,
    )
    .join('/');

  const slug = compose(
    noTrailingSlash,
    dedupePath,
    slugify,
  )(`${translatedPath}/${unorderify(title.replace(/\//g, '-'))}`);

  return slug;
};

function generateSidebar({ nodes, type = 'docs' }) {
  const sidebarTreeBuilder = buildFileTree(buildFileTreeNode);

  nodes.forEach(({ name, relativeDirectory, children: [remarkNode] }) => {
    const {
      frontmatter: { title, redirect, hideFromSidebar, draft, slug },
    } = remarkNode;

    // skip altogether if this content has draft flag
    // OR hideFromSidebar
    if ((draft === 'true' && isProduction) || hideFromSidebar) return;

    // titles like k6/html treated like paths otherwise
    let path = unorderify(
      `/${stripDirectoryPath(relativeDirectory, type)}/${title.replace(
        /\//g,
        '-',
      )}`,
    );

    if (type === 'guides' && path.startsWith('/es/')) {
      path = unorderify(path)
        .split('/')
        .map((item) =>
          translations[item] !== undefined ? translations[item].es : item,
        )
        .join('/');
    }

    sidebarTreeBuilder.addNode(
      unorderify(stripDirectoryPath(relativeDirectory, type)),
      unorderify(name),
      {
        path:
          slug ||
          compose(
            noTrailingSlash,
            removeGuidesAndRedirectWelcome,
            dedupePath,
            slugify,
          )(path),
        title,
        redirect: replaceRestApiRedirect({ isProduction, title, redirect }),
      },
    );
  });

  return sidebarTreeBuilder.getTree();
}

function getSupplementaryPagesProps({
  topLevelNames,
  topLevelLinks,
  getSidebar,
  getGuidesSidebar,
}) {
  const notFoundProps = {
    path: '/404',
    component: Path.resolve(`./src/templates/404.js`),
    context: {
      sidebarTree: getSidebar('guides'),
      navLinks: topLevelLinks,
    },
  };
  const stubPagesProps = topLevelNames
    .filter(
      (s) =>
        ![
          'javascript api',
          'examples',
          isProduction ? 'cloud rest api' : '',
        ].includes(s.toLowerCase()),
    )
    .flatMap((section) => {
      return childrenToList(getSidebar(section).children).map(({ name }) => {
        const path = `${section}/${name}`;
        const breadcrumbs = compose(
          buildBreadcrumbs,
          dedupePath,
          removeGuides,
        )(path);
        return {
          path: compose(
            noTrailingSlash,
            dedupePath,
            removeGuides,
            slugify,
          )(path),
          component: Path.resolve('./src/templates/docs/breadcrumb-stub.js'),
          context: {
            sidebarTree: getSidebar(section),
            breadcrumbs,
            title: name,
            navLinks: topLevelLinks,
            directChildren: getSidebar(section).children[name].children,
          },
        };
      });
    });

  const stubGuidesPagesProps = ['en', 'es'].flatMap((section) => {
    return childrenToList(getGuidesSidebar(section).children).map(
      ({ name, meta }) => {
        const path = `${section}/${meta.title}`;
        const breadcrumbs = compose(
          buildBreadcrumbs,
          dedupePath,
          removeGuides,
        )(path);

        return {
          path: compose(
            noTrailingSlash,
            dedupePath,
            removeGuides,
            slugify,
          )(path),
          component: Path.resolve('./src/templates/docs/breadcrumb-stub.js'),
          context: {
            sidebarTree: getGuidesSidebar(section),
            breadcrumbs: breadcrumbs.filter(
              (item) => !SUPPORTED_LOCALES.includes(item.path.replace('/', '')),
            ),
            title: meta.title,
            navLinks: topLevelLinks,
            directChildren: getGuidesSidebar(section).children[name].children,
          },
        };
      },
    );
  });

  return stubPagesProps.concat(notFoundProps, stubGuidesPagesProps);
}

function getTopLevelPagesProps({
  topLevelNames,
  topLevelLinks,
  getSidebar,
  getGuidesSidebar,
  pathCollisionDetectorInstance,
}) {
  // generating pages currently presented in templates/docs/ folder
  // for the exception of Cloud REST API
  return topLevelNames
    .map((name) => {
      const slug = slugify(name);
      // manually exclude from top navigation cloud rest api section
      if (slug === 'cloud-rest-api') {
        return false;
      }
      // path collision check
      if (
        !pathCollisionDetectorInstance
          .add({ path: slug, name: `${slug}.js` })
          .isUnique()
      ) {
        // skip page creation if there is already a page with identical url
        return false;
      }

      return {
        path: slug === 'guides' ? `/` : `/${slug}`,
        component: Path.resolve(`./src/templates/docs/${slug}.js`),
        context: {
          sidebarTree: getSidebar(name),
          navLinks: topLevelLinks,
        },
      };
    })
    .concat(
      ['en', 'es'].map((locale) => ({
        path: locale === 'en' ? 'en/guides' : 'es/guías',
        component: Path.resolve(`./src/templates/docs/guides.js`),
        context: {
          sidebarTree: getGuidesSidebar(locale),
          navLinks: topLevelLinks,
          locale,
        },
      })),
    )
    .filter(Boolean);
}

function getDocPagesProps({
  nodes,
  reporter,
  topLevelLinks,
  getSidebar,
  pathCollisionDetectorInstance,
}) {
  // creating actual docs pages
  return nodes
    .map(({ relativeDirectory, children: [remarkNode], name }) => {
      const strippedDirectory = stripDirectoryPath(relativeDirectory, 'docs');
      // for debuggin purpose in case there are errors in md/html syntax
      if (typeof remarkNode === 'undefined') {
        reporter.warn(
          `\nMarkup of a page is broken, unable to generate. Check the following file: \n\n 
            ${relativeDirectory}/${name}`,
        );
        return false;
      }
      if (typeof remarkNode.frontmatter === 'undefined') {
        reporter.warn(
          `\nFrontmatter data is missing, unable to generate the page. Check the following file:\n\n ${relativeDirectory}/${name}`,
        );
        return false;
      }
      const {
        frontmatter,
        frontmatter: { title, redirect, draft, slug: customSlug },
      } = remarkNode;
      // if there is a value in redirect field, skip page creation
      // OR there is draft flag and mode is prod
      if ((draft === 'true' && isProduction) || redirect) {
        return false;
      }
      const path = `${strippedDirectory}/${title.replace(/\//g, '-')}`;
      const slug =
        customSlug ||
        compose(
          noTrailingSlash,
          dedupePath,
          removeGuides,
          unorderify,
          slugify,
        )(path);
      // path collision check
      if (!pathCollisionDetectorInstance.add({ path: slug, name }).isUnique()) {
        // skip the page creation if there is already a page with identical url
        return false;
      }

      // generate breadcrumbs
      const breadcrumbs = compose(
        buildBreadcrumbs,
        dedupePath,
        removeGuides,
        unorderify,
      )(path);

      const extendedRemarkNode = {
        ...remarkNode,
        frontmatter: {
          ...frontmatter,
          slug,
          // injection of a link to an article in git repo
          fileOrigin: encodeURI(
            `https://github.com/loadimpact/k6-docs/blob/master/src/data/${relativeDirectory}/${name}.md`,
          ),
        },
      };

      const docSection = compose(
        getDocSection,
        removeLocaleFromPath,
        unorderify,
      )(strippedDirectory);

      const sidebarTree = getSidebar(docSection);

      return {
        path: slug,
        component: Path.resolve('./src/templates/doc-page.js'),
        context: {
          remarkNode: extendedRemarkNode,
          sidebarTree,
          breadcrumbs: breadcrumbs.filter(
            (item) => !SUPPORTED_LOCALES.includes(item.path.replace('/', '')),
          ),
          navLinks: topLevelLinks,
        },
      };
    })
    .filter(Boolean);
}

function getGuidesPagesProps({
  nodesGuides,
  reporter,
  topLevelLinks,
  pathCollisionDetectorInstance,
  getGuidesSidebar,
}) {
  // creating actual docs pages
  return nodesGuides
    .map(({ relativeDirectory, children: [remarkNode], name }) => {
      const strippedDirectory = relativeDirectory.replace(
        /^.*guides\/(.*)$/,
        '$1',
      );
      // for debuggin purpose in case there are errors in md/html syntax
      if (typeof remarkNode === 'undefined') {
        reporter.warn(
          `\nMarkup of a page is broken, unable to generate. Check the following file: \n\n 
            ${relativeDirectory}/${name}`,
        );
        return false;
      }
      if (typeof remarkNode.frontmatter === 'undefined') {
        reporter.warn(
          `\nFrontmatter data is missing, unable to generate the page. Check the following file:\n\n ${relativeDirectory}/${name}`,
        );
        return false;
      }
      const {
        frontmatter,
        frontmatter: { title, redirect, draft, slug: customSlug },
      } = remarkNode;
      // if there is a value in redirect field, skip page creation
      // OR there is draft flag and mode is prod
      if ((draft === 'true' && isProduction) || redirect) {
        return false;
      }
      const path = `${strippedDirectory}/${title.replace(/\//g, '-')}`;

      const shouldTranslate = strippedDirectory.startsWith('es/');

      const slug = shouldTranslate
        ? getTranslatedSlug(relativeDirectory, title, 'es', 'guides')
        : getSlug(relativeDirectory, title, 'guides');

      const pageSlug = customSlug || slug;

      // path collision check
      if (!pathCollisionDetectorInstance.add({ path: slug, name }).isUnique()) {
        // skip the page creation if there is already a page with identical url
        return false;
      }

      // generate breadcrumbs
      let breadcrumbs = compose(
        buildBreadcrumbs,
        dedupePath,
        removeGuides,
        unorderify,
      )(path);

      if (shouldTranslate) {
        const translatedPath = unorderify(path)
          .split('/')
          .map((item) =>
            translations[item] !== undefined ? translations[item].es : item,
          )
          .join('/');

        breadcrumbs = compose(
          buildBreadcrumbs,
          dedupePath,
          removeGuides,
        )(translatedPath);
      }

      // @TODO: update if other languages are added
      const isLocalizedPage = strippedDirectory.startsWith('es/');

      const sidebarTree = isLocalizedPage
        ? getGuidesSidebar('es')
        : getGuidesSidebar('en');

      // find translations of page
      const filePath = unorderify(
        stripDirectoryPath(relativeDirectory, 'guides'),
        // remove locale prefix
      ).slice(3);

      const treeReducer = (subtree, currentNode) => {
        return subtree.children[currentNode];
      };

      const englishVersion = [...filePath.split('/'), unorderify(name)].reduce(
        treeReducer,
        getGuidesSidebar('en'),
      ).meta;

      const spanishVersion = [...filePath.split('/'), unorderify(name)].reduce(
        treeReducer,
        getGuidesSidebar('es'),
      ).meta;

      const extendedRemarkNode = {
        ...remarkNode,
        frontmatter: {
          ...frontmatter,
          slug,
          // injection of a link to an article in git repo
          fileOrigin: encodeURI(
            `https://github.com/loadimpact/k6-docs/blob/master/src/data/${relativeDirectory}/${name}.md`,
          ),
          translations: {
            en: englishVersion,
            es: spanishVersion,
          },
        },
      };

      return {
        path: pageSlug,
        component: Path.resolve('./src/templates/doc-page.js'),
        context: {
          remarkNode: extendedRemarkNode,
          sidebarTree,
          breadcrumbs: breadcrumbs.filter(
            (item) => !SUPPORTED_LOCALES.includes(item.path.replace('/', '')),
          ),
          navLinks: topLevelLinks,
        },
      };
    })
    .filter(Boolean);
}

async function fetchDocPagesData(graphql) {
  const {
    data: {
      allFile: { nodes },
    },
  } = await graphql(
    `
      query docPagesQuery {
        allFile(
          filter: {
            ext: { in: [".md"] }
            relativeDirectory: { regex: "/docs/" }
          }
          sort: { fields: absolutePath, order: ASC }
        ) {
          nodes {
            name
            relativeDirectory
            children {
              ... on Mdx {
                body
                frontmatter {
                  title
                  slug
                  head_title
                  excerpt
                  redirect
                  hideFromSidebar
                  draft
                }
              }
            }
          }
        }
      }
    `,
  );
  return nodes;
}

async function fetchGuidesPagesData(graphql) {
  const {
    data: {
      allFile: { nodes },
    },
  } = await graphql(
    `
      query guidesPagesQuery {
        allFile(
          filter: {
            ext: { in: [".md"] }
            relativeDirectory: { regex: "/translated-guides/" }
          }
          sort: { fields: absolutePath, order: ASC }
        ) {
          nodes {
            name
            relativeDirectory
            children {
              ... on Mdx {
                body
                frontmatter {
                  title
                  slug
                  head_title
                  excerpt
                  redirect
                  hideFromSidebar
                  draft
                }
              }
            }
          }
        }
      }
    `,
  );
  return nodes;
}

async function createDocPages({
  nodes,
  nodesGuides,
  sidebar,
  guidesSidebar,
  actions,
  reporter,
}) {
  // initiating path collision checker
  const pathCollisionDetectorInstance = pathCollisionDetector(reporter.warn);

  // local helper function that uses currying, expects one more arg
  const getSidebar = getChildSidebar(sidebar);

  // local helper function that uses currying, expects one more arg
  const getGuidesSidebar = getChildSidebar(guidesSidebar);

  // create data for rendering docs navigation
  const topLevelNames = Object.keys(sidebar.children).filter(
    (child) => !SUPPORTED_LOCALES.includes(child),
  );

  const topLevelLinks = topLevelNames
    .filter((name) => name !== 'Cloud REST API')
    .map((name) => ({
      label: name === 'cloud' ? 'Cloud Docs' : name.toUpperCase(),
      to: name === 'guides' ? `/` : `/${slugify(name)}`,
    }));

  getDocPagesProps({
    nodes,
    reporter,
    topLevelLinks,
    pathCollisionDetectorInstance,
    getSidebar,
  })
    .concat(
      getGuidesPagesProps({
        nodesGuides,
        reporter,
        topLevelLinks,
        pathCollisionDetectorInstance,
        getGuidesSidebar,
      }),
      getTopLevelPagesProps({
        topLevelNames,
        topLevelLinks,
        getSidebar,
        getGuidesSidebar,
        pathCollisionDetectorInstance,
      }),
      getSupplementaryPagesProps({
        topLevelNames,
        topLevelLinks,
        getSidebar,
        getGuidesSidebar,
      }),
    )
    .map((pageProps) => actions.createPage(pageProps));
}

const createRedirects = ({ actions, pathPrefix }) => {
  const { createRedirect } = actions;

  [
    {
      fromPath: `${pathPrefix}/getting-started/welcome`,
      toPath: pathPrefix || `/`,
      redirectInBrowser: true,
      isPermanent: true,
    },
    // No workaround for that atm,
    // we have to redirect this section manually
    // for each locale
    {
      fromPath: `${pathPrefix}/es/empezando/bienvenido`,
      toPath: `${pathPrefix}/es` || `/es`,
      redirectInBrowser: true,
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-http/cookiejar-k6-http',
      toPath: '/javascript-api/k6-http/cookiejar',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-cookiesforurl-url',
      toPath: '/javascript-api/k6-http/cookiejar/cookiejar-cookiesforurl-url',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-set-name-value-options',
      toPath:
        '/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options',
      toPath:
        '/javascript-api/k6-http/cookiejar/cookiejar-set-url-name-value-options',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-http/filedata-k6-http',
      toPath: '/javascript-api/k6-http/filedata',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-http/params-k6-http',
      toPath: '/javascript-api/k6-http/params',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-http/response-k6-http',
      toPath: '/javascript-api/k6-http/response',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-http/response-k6-http/response-clicklink-params',
      toPath: '/javascript-api/k6-http/response/response-clicklink-params',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-http/response-k6-http/response-html',
      toPath: '/javascript-api/k6-http/response/response-html',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-http/response-k6-http/response-json-selector',
      toPath: '/javascript-api/k6-http/response/response-json-selector',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-http/response-k6-http/response-submitform-params',
      toPath: '/javascript-api/k6-http/response/response-submitform-params',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/counter-k6-metrics',
      toPath: '/javascript-api/k6-metrics/counter',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-metrics/counter-k6-metrics/counter-add-value-tags',
      toPath: '/javascript-api/k6-metrics/counter/counter-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/gauge-k6-metrics',
      toPath: '/javascript-api/k6-metrics/gauge',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-metrics/gauge-k6-metrics/gauge-add-value-tags',
      toPath: '/javascript-api/k6-metrics/gauge/gauge-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/rate-k6-metrics',
      toPath: '/javascript-api/k6-metrics/rate',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-metrics/rate-k6-metrics/rate-add-value-tags',
      toPath: '/javascript-api/k6-metrics/rate/rate-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/trend-k6-metrics',
      toPath: '/javascript-api/k6-metrics/trend',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-metrics/trend-k6-metrics/trend-add-value-tags',
      toPath: '/javascript-api/k6-metrics/trend/trend-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/archives-for-bundling-sharing-a-test',
      toPath: '/misc/archive-command',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/ssl-tls',
      toPath: '/using-k6/protocols/ssl-tls',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/ssl-tls/online-certificate-status-protocol-ocsp',
      toPath:
        '/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/ssl-tls/ssl-tls-client-certificates',
      toPath: '/using-k6/protocols/ssl-tls/ssl-tls-client-certificates',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/ssl-tls/ssl-tls-version-and-ciphers',
      toPath: '/using-k6/protocols/ssl-tls/ssl-tls-version-and-ciphers',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/multipart-requests-file-uploads',
      toPath: '/examples/data-uploads',
      isPermanent: true,
    },
    {
      fromPath: '/getting-started/results-output/apache-kafka',
      toPath: '/results-visualization/apache-kafka',
      isPermanent: true,
    },
    {
      fromPath: '/getting-started/results-output/cloud',
      toPath: '/results-visualization/cloud',
      isPermanent: true,
    },
    {
      fromPath: '/results-visualization/k6-cloud-test-results',
      toPath: '/results-visualization/cloud',
      isPermanent: true,
    },
    {
      fromPath: '/getting-started/results-output/datadog',
      toPath: '/results-visualization/datadog',
      isPermanent: true,
    },
    {
      fromPath: '/getting-started/results-output/influxdb',
      toPath: '/results-visualization/influxdb-+-grafana',
      isPermanent: true,
    },
    {
      fromPath: '/getting-started/results-output/json',
      toPath: '/results-visualization/json',
      isPermanent: true,
    },
    {
      fromPath: '/getting-started/results-output/statsd',
      toPath: '/results-visualization/statsd',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/counter/counter-add-value-tags',
      toPath:
        '/javascript-api/k6-metrics/counter-k6-metrics/counter-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/gauge/gauge-add-value-tags',
      toPath:
        '/javascript-api/k6-metrics/gauge-k6-metrics/gauge-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/rate/rate-add-value-tags',
      toPath: '/javascript-api/k6-metrics/rate-k6-metrics/rate-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath: '/javascript-api/k6-metrics/trend/trend-add-value-tags',
      toPath:
        '/javascript-api/k6-metrics/trend-k6-metrics/trend-add-value-tags',
      isPermanent: true,
    },
    {
      fromPath:
        '/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options',
      toPath:
        '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-set-name-value-options',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/cloud-execution',
      toPath: '/cloud/creating-and-running-a-test/cloud-tests-from-the-cli',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/html/working-with-html-forms',
      toPath: '/examples/html-forms',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/html',
      toPath: '/javascript-api/k6-html',
      isPermanent: true,
    },
    {
      fromPath: '/using-k6/session-recording-har-support',
      toPath: '/test-authoring/recording-a-session',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/creating-and-running-a-test/test-builder',
      toPath: '/test-authoring/test-builder',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/creating-and-running-a-test/in-app-script-editor',
      toPath: '/cloud/creating-and-running-a-test/script-editor',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/creating-and-running-a-test/recording-a-test-script',
      toPath: '/test-authoring/recording-a-session/browser-recorder',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/creating-and-running-a-test/converters',
      toPath: '/integrations',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/integrations/ci',
      toPath: '/integrations',
      isPermanent: true,
    },
    {
      fromPath:
        '/cloud/cloud-faq/calculating-virtual-uses-with-google-analytics',
      toPath: 'https://k6.io/blog/monthly-visits-concurrent-users',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/cloud-faq/what-is-data-retention',
      toPath: '/cloud/billing-user-menu/data-retention',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/cloud-faq/pricing-faq',
      toPath: '/cloud/cloud-faq/pricing-questions',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/cloud-faq/what-ip-addresses-are-used-by-the-k6-cloud',
      toPath: '/cloud/cloud-faq/general-questions',
      isPermanent: true,
    },
    {
      fromPath:
        '/cloud/cloud-faq/what-is-the-best-way-to-debug-my-load-test-scripts',
      toPath: '/cloud/cloud-faq/general-questions',
      isPermanent: true,
    },
    {
      fromPath:
        '/cloud/cloud-faq/i-was-invited-to-an-organization-and-i-cannot-run-tests',
      toPath: '/cloud/cloud-faq/general-questions',
      isPermanent: true,
    },
    {
      fromPath:
        '/cloud/cloud-faq/how-to-open-your-firewall-to-k6-cloud-service-for-cloud-executed-tests',
      toPath: '/cloud/cloud-faq/general-questions',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/cloud-faq/test-status-codes',
      toPath: '/cloud/cloud-faq/general-questions',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/cloud-faq/what-are-vus-virtual-users',
      toPath: '/cloud/cloud-faq/general-questions',
      isPermanent: true,
    },
    {
      fromPath: '/cloud/cloud-faq/data-uploads-with-k6-cloud',
      toPath: '/cloud/cloud-faq/general-questions',
      isPermanent: true,
    },
    {
      fromPath: '/misc/usage-reports',
      toPath: '/misc/usage-collection',
      isPermanent: true,
    },
  ].map(createRedirect);
};

exports.createPages = async (options) => {
  const pagesData = await fetchDocPagesData(options.graphql);
  const guidesData = await fetchGuidesPagesData(options.graphql);

  const sidebar = generateSidebar({ nodes: pagesData });
  const guidesSidebar = generateSidebar({ nodes: guidesData, type: 'guides' });

  console.log('GUIDES SIDE', guidesSidebar);

  await createDocPages({
    ...options,
    nodes: pagesData,
    nodesGuides: guidesData,
    sidebar,
    guidesSidebar,
  });
  await createRedirects(options);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  // Adding default values for some fields and moving them under node.fields
  // because that how createNodeField works
  if (node.frontmatter) {
    createNodeField({
      node,
      name: 'redirect',
      value: node.frontmatter.redirect || '',
    });
    createNodeField({
      node,
      name: 'hideFromSidebar',
      value: node.frontmatter.hideFromSidebar || false,
    });
    createNodeField({
      node,
      name: 'draft',
      value: node.frontmatter.draft || 'false',
    });
    createNodeField({
      node,
      name: 'head_title',
      value: node.frontmatter.head_title || '',
    });
    createNodeField({
      node,
      name: 'slug',
      value: node.frontmatter.slug || '',
    });
  }
};
