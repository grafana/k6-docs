const Path = require('path');

const {
  pathCollisionDetector,
  slugify,
  buildFileTree,
  buildFileTreeNode,
  stripDirectoryPath,
  compose,
  getChildSidebar,
  unorderify,
  getDocSection,
  buildBreadcrumbs,
  childrenToList,
  noTrailingSlash,
  removeGuides,
  dedupePath,
  removeGuidesAndRedirectWelcome,
} = require('./src/utils/utils');

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

async function createDocPages({ graphql, actions, reporter }) {
  // initiating path collision checker
  const pathCollisionDetectorInstance = pathCollisionDetector(reporter.warn);
  const {
    data: {
      allFile: { nodes },
    },
  } = await graphql(`
    query docPagesQuery {
      allFile(
        filter: { ext: { in: [".md"] }, relativeDirectory: { regex: "/docs/" } }
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
  `);

  // Build a tree for a sidebar
  const sidebarTreeBuilder = buildFileTree(buildFileTreeNode);

  nodes.forEach(({ name, relativeDirectory, children: [remarkNode] }) => {
    const {
      frontmatter: { title, redirect, hideFromSidebar, draft, slug },
    } = remarkNode;

    // skip altogether if this content has draft flag
    // OR hideFromSidebar
    if ((draft === 'true' && isProduction) || hideFromSidebar) return;

    // titles like k6/html treated like paths otherwise
    const path = `/${stripDirectoryPath(
      relativeDirectory,
      'docs',
    )}/${title.replace(/\//g, '-')}`;

    sidebarTreeBuilder.addNode(
      unorderify(stripDirectoryPath(relativeDirectory, 'docs')),
      unorderify(name),
      {
        path:
          slug ||
          compose(
            noTrailingSlash,
            removeGuidesAndRedirectWelcome,
            dedupePath,
            unorderify,
            slugify,
          )(path),
        title,
        redirect: replaceRestApiRedirect({ isProduction, title, redirect }),
      },
    );
  });

  // tree representation of a data/markdown/docs folder
  const sidebar = sidebarTreeBuilder.getTree();

  // local helper function that uses carrying, expects one more arg
  const getSidebar = getChildSidebar(sidebar);
  const docPageNav = Object.keys(sidebar.children);

  // create data for rendering docs navigation
  const docPageNavLinks = docPageNav
    .filter((item) => item !== 'Cloud REST API')
    .map((item) => ({
      label: item === 'cloud' ? 'Cloud Docs' : item.toUpperCase(),
      to: item === 'guides' ? `/` : `/${slugify(item)}`,
    }))
    .filter(Boolean);

  // creating actual docs pages
  nodes.forEach(({ relativeDirectory, children: [remarkNode], name }) => {
    const strippedDirectory = stripDirectoryPath(relativeDirectory, 'docs');
    // for debuggin purpose in case there are errors in md/html syntax
    if (typeof remarkNode === 'undefined') {
      reporter.warn(
        `\nMarkup of a page is broken, unable to generate. Check the following file: \n\n 
          ${relativeDirectory}/${name}`,
      );
      return;
    }
    if (typeof remarkNode.frontmatter === 'undefined') {
      reporter.warn(
        `\nFrontmatter data is missing, unable to generate. Check the following file:\n\n ${relativeDirectory}/${name}`,
      );
    }
    const {
      frontmatter,
      frontmatter: { title, redirect, draft, slug: customSlug },
    } = remarkNode;
    // if there is a value in redirect field, skip page creation
    // OR there is draft flag and mode is prod
    if ((draft === 'true' && isProduction) || redirect) {
      return;
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
      return;
    }
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
          `https://github.com/k6io/docs/blob/master/src/data/${relativeDirectory}/${name}.md`,
        ),
      },
    };

    actions.createPage({
      path: slug,
      component: Path.resolve('./src/templates/doc-page.js'),
      context: {
        remarkNode: extendedRemarkNode,
        // dynamically evaluate which part of the sidebar tree are going to be used
        sidebarTree: compose(
          getSidebar,
          getDocSection,
          unorderify,
        )(strippedDirectory),
        breadcrumbs,
        navLinks: docPageNavLinks,
      },
    });
  });

  // generating pages currently presented in templates/docs/ folder
  // for the exception of Cloud REST API
  docPageNav.forEach((item) => {
    const slug = slugify(item);
    // manually exclude from top navigation cloud rest api section
    if (slug === 'cloud-rest-api') {
      return;
    }
    // path collision check
    if (
      !pathCollisionDetectorInstance
        .add({ path: slug, name: `${slug}.js` })
        .isUnique()
    ) {
      // skip the page creation if there is already a page with identical url
      return;
    }
    actions.createPage({
      path: slug === 'guides' ? `/` : `/${slug}`,
      component: Path.resolve(`./src/templates/docs/${slug}.js`),
      context: {
        sidebarTree: getSidebar(item),
        navLinks: docPageNavLinks,
      },
    });
  });

  // generating custom 404
  actions.createPage({
    path: '/404',
    component: Path.resolve(`./src/templates/404.js`),
    context: {
      sidebarTree: getSidebar('guides'),
      navLinks: docPageNavLinks,
    },
  });

  // generating a bunch of breadcrumbs stubs for top level non-links categories

  // ! attention: filtering here because of unplanned
  // case with actual pages for top level
  // sidebar sections. Removing breadcrumbs stub
  // generation manually.
  docPageNav
    .filter(
      (s) =>
        ![
          'javascript api',
          'examples',
          isProduction ? 'cloud rest api' : '',
        ].includes(s.toLowerCase()),
    )
    .forEach((section) => {
      childrenToList(getSidebar(section).children).forEach(({ name }) => {
        const path = `${section}/${name}`;
        const breadcrumbs = compose(
          buildBreadcrumbs,
          dedupePath,
          removeGuides,
        )(path);
        actions.createPage({
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
            navLinks: docPageNavLinks,
            directChildren: getSidebar(section).children[name].children,
          },
        });
      });
    });
}

const createRedirects = ({ actions, pathPrefix }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `${pathPrefix}/getting-started/welcome`,
    toPath: pathPrefix || `/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-http/cookiejar-k6-http',
    toPath: '/javascript-api/k6-http/cookiejar',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-cookiesforurl-url',
    toPath: '/javascript-api/k6-http/cookiejar/cookiejar-cookiesforurl-url',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-set-name-value-options',
    toPath:
      '/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options',
    toPath:
      '/javascript-api/k6-http/cookiejar/cookiejar-set-url-name-value-options',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-http/filedata-k6-http',
    toPath: '/javascript-api/k6-http/filedata',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-http/params-k6-http',
    toPath: '/javascript-api/k6-http/params',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-http/response-k6-http',
    toPath: '/javascript-api/k6-http/response',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/javascript-api/k6-http/response-k6-http/response-clicklink-params',
    toPath: '/javascript-api/k6-http/response/response-clicklink-params',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-http/response-k6-http/response-html',
    toPath: '/javascript-api/k6-http/response/response-html',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-http/response-k6-http/response-json-selector',
    toPath: '/javascript-api/k6-http/response/response-json-selector',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/javascript-api/k6-http/response-k6-http/response-submitform-params',
    toPath: '/javascript-api/k6-http/response/response-submitform-params',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-metrics/counter-k6-metrics',
    toPath: '/javascript-api/k6-metrics/counter',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-metrics/gauge-k6-metrics',
    toPath: '/javascript-api/k6-metrics/gauge',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-metrics/rate-k6-metrics',
    toPath: '/javascript-api/k6-metrics/rate',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/javascript-api/k6-metrics/trend-k6-metrics',
    toPath: '/javascript-api/k6-metrics/trend',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/using-k6/archives-for-bundling-sharing-a-test',
    toPath: '/misc/archive-command',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/using-k6/ssl-tls',
    toPath: '/using-k6/protocols/ssl-tls',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/using-k6/ssl-tls/online-certificate-status-protocol-ocsp',
    toPath:
      '/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/using-k6/ssl-tls/ssl-tls-client-certificates',
    toPath: '/using-k6/protocols/ssl-tls/ssl-tls-client-certificates',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/using-k6/ssl-tls/ssl-tls-version-and-ciphers',
    toPath: '/using-k6/protocols/ssl-tls/ssl-tls-version-and-ciphers',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/using-k6/multipart-requests-file-uploads',
    toPath: '/examples/data-uploads',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/getting-started/results-output/apache-kafka',
    toPath: '/results-visualization/apache-kafka',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/getting-started/results-output/cloud',
    toPath: '/results-visualization/cloud',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/results-visualization/k6-cloud-test-results',
    toPath: '/results-visualization/cloud',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/getting-started/results-output/datadog',
    toPath: '/results-visualization/datadog',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/getting-started/results-output/influxdb',
    toPath: '/results-visualization/influxdb-+-grafana',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/getting-started/results-output/json',
    toPath: '/results-visualization/json',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/getting-started/results-output/statsd',
    toPath: '/results-visualization/statsd',
    isPermanent: true,
  });

  createRedirect({
    fromPath:
      '/javascript-api/k6-metrics/counter-k6-metrics/counter-add-value-tags',
    toPath: '/javascript-api/k6-metrics/counter/counter-add-value-tags',
    isPermanent: true,
  });

  createRedirect({
    fromPath:
      '/javascript-api/k6-metrics/gauge-k6-metrics/gauge-add-value-tags',
    toPath: '/javascript-api/k6-metrics/gauge/gauge-add-value-tags',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/javascript-api/k6-metrics/rate-k6-metrics/rate-add-value-tags',
    toPath: '/javascript-api/k6-metrics/rate/rate-add-value-tags',
    isPermanent: true,
  });

  createRedirect({
    fromPath:
      '/javascript-api/k6-metrics/trend-k6-metrics/trend-add-value-tags',
    toPath: '/javascript-api/k6-metrics/trend/trend-add-value-tags',
    isPermanent: true,
  });

  createRedirect({
    fromPath:
      '/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options',
    toPath:
      '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-set-name-value-options',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/using-k6/cloud-execution',
    toPath: '/cloud/creating-and-running-a-test/cloud-tests-from-the-cli',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/using-k6/html/working-with-html-forms',
    toPath: '/examples/html-forms',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/using-k6/html',
    toPath: '/javascript-api/k6-html',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/using-k6/session-recording-har-support',
    toPath: '/test-authoring/recording-a-session',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/creating-and-running-a-test/test-builder',
    toPath: '/test-authoring/test-builder',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/creating-and-running-a-test/in-app-script-editor',
    toPath: '/cloud/creating-and-running-a-test/script-editor',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/creating-and-running-a-test/recording-a-test-script',
    toPath: '/test-authoring/recording-a-session/browser-recorder',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/creating-and-running-a-test/converters',
    toPath: '/integrations',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/integrations/ci',
    toPath: '/integrations',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/cloud-faq/calculating-virtual-uses-with-google-analytics',
    toPath: 'https://k6.io/blog/monthly-visits-concurrent-users',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/cloud-faq/what-is-data-retention',
    toPath: '/cloud/billing-user-menu/data-retention',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/cloud-faq/pricing-faq',
    toPath: '/cloud/cloud-faq/pricing-questions',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/cloud-faq/what-ip-addresses-are-used-by-the-k6-cloud',
    toPath: '/cloud/cloud-faq/general-questions',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/cloud/cloud-faq/what-is-the-best-way-to-debug-my-load-test-scripts',
    toPath: '/cloud/cloud-faq/general-questions',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/cloud/cloud-faq/i-was-invited-to-an-organization-and-i-cannot-run-tests',
    toPath: '/cloud/cloud-faq/general-questions',
    isPermanent: true,
  });
  createRedirect({
    fromPath:
      '/cloud/cloud-faq/how-to-open-your-firewall-to-k6-cloud-service-for-cloud-executed-tests',
    toPath: '/cloud/cloud-faq/general-questions',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/cloud-faq/test-status-codes',
    toPath: '/cloud/cloud-faq/general-questions',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/cloud-faq/what-are-vus-virtual-users',
    toPath: '/cloud/cloud-faq/general-questions',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/cloud-faq/data-uploads-with-k6-cloud',
    toPath: '/cloud/cloud-faq/general-questions',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/misc/usage-reports',
    toPath: '/misc/usage-collection',
    isPermanent: true,
  });
};

exports.createPages = async (options) => {
  await createDocPages(options);
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
