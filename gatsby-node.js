/* eslint-disable max-len */
const Path = require('path');

const {
  slugify,
  compose,
  childrenToList,
  stripDirectoryPath,
  dotifyVersion,
} = require('./src/utils/utils');
const {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  pathCollisionDetector,
  buildFileTree,
  buildFileTreeNode,
  getChildSidebar,
  unorderify,
  getDocSection,
  buildBreadcrumbs,
  dedupePath,
  addPrefixSlash,
  addTrailingSlash,
  removeEnPrefix,
  translatePath,
  getSlug,
  getTranslatedSlug,
  replacePathsInSidebarTree,
  removeParametersFromJavaScriptAPISlug,
} = require('./src/utils/utils.node');
const {
  SUPPORTED_VERSIONS,
  LATEST_VERSION,
  DEFAULT_JS_API_VERSIONS_TO_BUILD,
} = require('./src/utils/versioning');

/* constants */
// auxilary flag to determine the environment (staging/prod)
const isProduction =
  process.env.GATSBY_DEFAULT_DOC_URL === 'https://k6.io/docs';

const getVersionedCustomSlug = (slug, pageVersion) => {
  if (pageVersion === LATEST_VERSION) {
    return slug;
  }

  return `/${pageVersion}${slug}`;
};

const jsApiVersionsToBuild =
  process.env.JS_API_VERSIONS_TO_BUILD || DEFAULT_JS_API_VERSIONS_TO_BUILD;
let SUPPORTED_VERSIONS_FOR_BUILD = SUPPORTED_VERSIONS;
if (!isProduction && jsApiVersionsToBuild) {
  SUPPORTED_VERSIONS_FOR_BUILD = SUPPORTED_VERSIONS.sort()
    .reverse()
    .slice(0, Math.max(jsApiVersionsToBuild - 1, 0));
}

const newJavascriptURLsRedirects = {};

function removeParametersFromJavaScriptAPISlugAndAddToRedirectsArray(
  slug,
  title,
) {
  const newSlug = removeParametersFromJavaScriptAPISlug(slug, title);

  if (slug !== newSlug) {
    newJavascriptURLsRedirects[addPrefixSlash(slug)] = newSlug;
    return newSlug;
  }

  return slug;
}

const formatSectionName = (name) => {
  if (name === 'javascript api') {
    return 'Javascript API';
  }

  return `${name[0].toUpperCase()}${name.slice(1)}`;
};

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

const getPageTranslations = (
  relativeDirectory,
  name,
  getGuidesSidebar,
  reporter,
) => {
  const treeReducer = (subtree, currentNode) => {
    if (
      !subtree ||
      typeof subtree.children === 'undefined' ||
      typeof subtree.children[currentNode] === 'undefined'
    ) {
      return null;
    }
    return subtree.children[currentNode];
  };

  const pageTranslations = {};

  const filePath = unorderify(
    stripDirectoryPath(relativeDirectory, 'guides'),
    // remove locale prefix
  ).slice(3);

  SUPPORTED_LOCALES.forEach((locale) => {
    let translation = [...filePath.split('/'), unorderify(name)].reduce(
      treeReducer,
      getGuidesSidebar(locale),
    );

    if (translation && translation.meta) {
      translation = translation.meta;
    } else {
      translation = null;
    }

    if (translation) {
      pageTranslations[locale] = translation;
    } else {
      reporter.warn(
        `No ${locale} translation found for ${relativeDirectory}/${name}`,
      );
    }
  });

  return pageTranslations;
};

const getPageVersions = (
  getSidebar,
  getJavascriptAPISidebar,
  relativeDirectory,
  name,
  currentVersion = null,
) => {
  const treeReducer = (subtree, currentNode) => {
    if (
      !subtree ||
      typeof subtree.children === 'undefined' ||
      typeof subtree.children[currentNode] === 'undefined'
    ) {
      return null;
    }
    return subtree.children[currentNode];
  };

  let filePath = unorderify(
    stripDirectoryPath(relativeDirectory, 'javascript-api'),
    // remove version prefix
  ).slice(currentVersion ? currentVersion.length + 1 : 0);

  if (!currentVersion) {
    filePath = unorderify(stripDirectoryPath(relativeDirectory, 'docs'));
  }

  filePath = filePath
    .replace('javascript api/', '')
    // for pages like /k6-crypto, k6-data etc
    .replace('javascript api', '');

  const pageVersions = {};

  SUPPORTED_VERSIONS.forEach((version) => {
    const versionedPath = (
      filePath === ''
        ? [unorderify(name)]
        : [...filePath.split('/'), unorderify(name)]
    ).reduce(
      treeReducer,
      getJavascriptAPISidebar(version).children['javascript api'],
    );

    if (versionedPath && versionedPath.meta) {
      pageVersions[version] = versionedPath.meta;
    }
  });

  // find latest version link
  const latestVersion = (
    filePath === ''
      ? [unorderify(name)]
      : [...filePath.split('/'), unorderify(name)]
  ).reduce(treeReducer, getSidebar('javascript api'));

  if (latestVersion && latestVersion.meta) {
    pageVersions[LATEST_VERSION] = latestVersion.meta;
  }

  return pageVersions;
};

const generateTopLevelLinks = () => [
  {
    label: 'guides',
    to: '/',
  },
  {
    label: 'JAVASCRIPT API',
    to: '/javascript-api/',
    submenu: [
      { label: 'k6 API', to: `/javascript-api/` },
      { label: 'xk6-browser', to: `/javascript-api/xk6-browser/` },
      { label: 'jslib', to: `/javascript-api/jslib/` },
    ],
  },
  {
    label: 'Cloud Docs',
    to: '/cloud/',
  },
  {
    label: 'Extensions',
    to: '/extensions/',
  },
  {
    label: 'Integrations',
    to: '/integrations/',
  },
  {
    label: 'examples',
    to: '/examples/',
  },
];

function generateSidebar({ nodes, type = 'docs' }) {
  const sidebarTreeBuilder = buildFileTree(buildFileTreeNode);

  nodes.forEach(({ name, relativeDirectory, children: [remarkNode] }) => {
    const {
      frontmatter: {
        title,
        redirect,
        redirectTarget,
        hideFromSidebar,
        draft,
        slug,
        shouldCreatePage,
      },
    } = remarkNode;

    // skip md files that we don't generate pages for
    if (shouldCreatePage === false) {
      return;
    }

    // skip altogether if this content has draft flag
    // OR hideFromSidebar
    if (draft === 'true' && isProduction) return;

    // titles like k6/html treated like paths otherwise
    const translatedPath = `${stripDirectoryPath(
      relativeDirectory,
      type,
    )}/${title.replace(/\//g, '-')}`;

    const pageLocale =
      SUPPORTED_LOCALES.find((locale) =>
        translatedPath.startsWith(`${locale}/`),
      ) || DEFAULT_LOCALE;

    let pageSlug =
      pageLocale === DEFAULT_LOCALE
        ? `/${getSlug(translatedPath)}`
        : `/${getTranslatedSlug(
            relativeDirectory,
            title,
            pageLocale,
            'guides',
          )}`;

    if (pageSlug === '//') {
      pageSlug = '/';
    }

    let customSlug = slug ? addTrailingSlash(slug) : null;

    const pageVersion = SUPPORTED_VERSIONS.find((version) =>
      translatedPath.startsWith(version),
    );

    if (pageVersion && customSlug) {
      customSlug = getVersionedCustomSlug(customSlug, pageVersion);
    }
    sidebarTreeBuilder.addNode(
      unorderify(stripDirectoryPath(relativeDirectory, type)),
      unorderify(name),
      {
        path: removeParametersFromJavaScriptAPISlugAndAddToRedirectsArray(
          customSlug || dotifyVersion(pageSlug),
          title,
        ),
        title,
        redirect: replaceRestApiRedirect({ isProduction, title, redirect }),
        redirectTarget,
        hideFromSidebar: hideFromSidebar || false,
        isActiveSidebarLink: true,
      },
    );
  });

  return sidebarTreeBuilder.getTree();
}

const getExtensionsPageSidebar = (sidebarTree) => {
  const extensionsSidebar = {
    name: 'extensions',
    meta: {
      title: 'Extensions',
      path: '/extensions/',
    },
    children: {},
  };

  return {
    ...extensionsSidebar,
    children: { ...extensionsSidebar.children, ...sidebarTree.children },
  };
};

function getSupplementaryPagesProps({
  reporter,
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
      navLinks: generateTopLevelLinks(topLevelLinks),
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
    .flatMap((section) =>
      childrenToList(getSidebar(section).children).map(({ name }) => {
        const path = `${section}/${name}`;
        let breadcrumbs = compose(buildBreadcrumbs, dedupePath)(path);

        // replace sidebar section name for k6 js api pages
        let sectionName = formatSectionName(section);

        if (path.startsWith('javascript-api/')) {
          sectionName = 'k6 API';

          breadcrumbs = breadcrumbs.map((item) => ({
            ...item,
            name: item.name === 'Javascript API' ? 'k6 API' : item.name,
          }));
        }

        let sidebarTree = getSidebar(section);

        if (path.startsWith('extensions/')) {
          sidebarTree = getExtensionsPageSidebar(sidebarTree);
        }

        return {
          path: compose(
            removeEnPrefix,
            addTrailingSlash,
            dedupePath,
            slugify,
          )(path),
          component: Path.resolve('./src/templates/docs/breadcrumb-stub.js'),
          context: {
            sidebarTree,
            sectionName,
            breadcrumbs,
            title: name,
            navLinks: generateTopLevelLinks(topLevelLinks),
            directChildren: getSidebar(section).children[name].children,
          },
        };
      }),
    );

  const stubGuidesPagesProps = SUPPORTED_LOCALES.flatMap((locale) =>
    childrenToList(getGuidesSidebar(locale).children).map(({ name, meta }) => {
      const path = `${locale}/${meta.title}`;
      const breadcrumbs = compose(
        buildBreadcrumbs,
        removeEnPrefix,
        dedupePath,
      )(path);

      const pageTranslations = {};
      SUPPORTED_LOCALES.forEach((locale) => {
        if (
          typeof getGuidesSidebar(locale).children[name] !== 'undefined' &&
          typeof getGuidesSidebar(locale).children[name].meta !== 'undefined'
        ) {
          pageTranslations[locale] =
            getGuidesSidebar(locale).children[name].meta;
        } else {
          reporter.warn(`No ${locale} translation found for ${name}`);
        }
      });

      return {
        path: compose(
          removeEnPrefix,
          addTrailingSlash,
          dedupePath,
          slugify,
        )(path),
        component: Path.resolve('./src/templates/docs/breadcrumb-stub.js'),
        context: {
          sidebarTree: getGuidesSidebar(locale),
          sectionName: 'Guides',
          breadcrumbs: breadcrumbs.filter(
            (item) => !SUPPORTED_LOCALES.includes(item.path.replace(/\//g, '')),
          ),
          title: meta.title,
          navLinks: generateTopLevelLinks(topLevelLinks),
          directChildren: getGuidesSidebar(locale).children[name].children,
          locale,
          translations: pageTranslations,
        },
      };
    }),
  );

  return stubPagesProps.concat(notFoundProps, stubGuidesPagesProps);
}

function getTopLevelPagesProps({
  topLevelNames,
  topLevelLinks,
  getSidebar,
  getGuidesSidebar,
  pathCollisionDetectorInstance,
  getJavascriptAPISidebar,
}) {
  // generating pages currently presented in templates/docs/ folder
  // for the exception of Cloud REST API
  return topLevelNames
    .filter(
      (item) =>
        item !== 'jslib' && item !== 'xk6-browser' && item !== 'extensions',
    )
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
        path: slug === 'guides' ? `/` : `/${slug}/`,
        component: Path.resolve(`./src/templates/docs/${slug}.js`),
        context: {
          sectionName: formatSectionName(name),
          sidebarTree: getSidebar(name),
          navLinks: generateTopLevelLinks(topLevelLinks),
        },
      };
    })
    .concat(
      SUPPORTED_LOCALES.map((locale) => ({
        path: locale === 'en' ? '/' : `/${locale}/`,
        component: Path.resolve(`./src/templates/docs/guides.js`),
        context: {
          sidebarTree: getGuidesSidebar(locale),
          navLinks: generateTopLevelLinks(topLevelLinks),
          locale,
          sectionName: 'Guides',
        },
      })),
    )
    .concat([
      {
        path: `/extensions/`,
        component: Path.resolve(`./src/templates/docs/extensions.js`),
        context: {
          sectionName: 'Extensions',
          sidebarTree: getExtensionsPageSidebar(getSidebar('extensions')),
          navLinks: generateTopLevelLinks(topLevelLinks),
        },
      },
      {
        path: `/extensions/getting-started/explore/`,
        component: Path.resolve(`./src/templates/docs/explore-extensions.js`),
        context: {
          sectionName: 'Extensions',
          sidebarTree: getExtensionsPageSidebar(getSidebar('extensions')),
          navLinks: generateTopLevelLinks(topLevelLinks),
        },
      },
      {
        path: `/extensions/getting-started/bundle/`,
        component: Path.resolve(`./src/templates/docs/bundle-builder.js`),
        context: {
          sectionName: 'Extensions',
          sidebarTree: getExtensionsPageSidebar(getSidebar('extensions')),
          navLinks: generateTopLevelLinks(topLevelLinks),
        },
      },
    ])
    .concat(
      SUPPORTED_VERSIONS_FOR_BUILD.map((version) => ({
        path: `/${version}/javascript-api/`,
        component: Path.resolve(
          `./src/templates/docs/versioned-javascript-api.js`,
        ),
        context: {
          sectionName: 'Javascript API',
          sidebarTree:
            getJavascriptAPISidebar(version).children['javascript api'],
          navLinks: generateTopLevelLinks(topLevelLinks),
          version,
          // eslint-disable-next-line no-useless-escape
          versionRegex: `/${version}\/javascript api/`,
          // eslint-disable-next-line no-useless-escape
          alternativeVersionRegex: `/${version}\/javascript api\/alternative main modules/`,
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
  getJavascriptAPISidebar,
  pathCollisionDetectorInstance,
}) {
  // creating actual docs pages
  return nodes
    .map(({ relativeDirectory, children: [remarkNode], name }) => {
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
        frontmatter: {
          title,
          redirect,
          draft,
          slug: customSlug,
          shouldCreatePage,
        },
      } = remarkNode;

      if (shouldCreatePage === false) {
        return false;
      }

      // if there is a value in redirect field, skip page creation
      // OR there is draft flag and mode is prod
      if ((draft === 'true' && isProduction) || redirect) {
        return false;
      }

      const strippedDirectory = stripDirectoryPath(relativeDirectory, 'docs');
      const path = `${strippedDirectory}/${title.replace(/\//g, '-')}`;

      let slug = customSlug ? addTrailingSlash(customSlug) : getSlug(path);
      // path collision check
      if (!pathCollisionDetectorInstance.add({ path: slug, name }).isUnique()) {
        // skip the page creation if there is already a page with identical url
        return false;
      }

      // generate breadcrumbs
      let breadcrumbs = compose(buildBreadcrumbs, dedupePath, unorderify)(path);

      const extendedRemarkNode = {
        ...remarkNode,
        frontmatter: {
          ...frontmatter,
          slug,
          // injection of a link to an article in git repo
          fileOrigin: encodeURI(
            `https://github.com/grafana/k6-docs/blob/main/src/data/${relativeDirectory}/${name}.md`,
          ),
        },
      };

      const docSection = compose(getDocSection, unorderify)(strippedDirectory);

      let sidebarTree = getSidebar(docSection);

      if (slug.startsWith('extensions/')) {
        sidebarTree = getExtensionsPageSidebar(sidebarTree);
      }

      let pageVersions = null;

      if (
        slug.startsWith('javascript-api/') ||
        slug.startsWith('/javascript-api/')
      ) {
        pageVersions = getPageVersions(
          getSidebar,
          getJavascriptAPISidebar,
          relativeDirectory,
          name,
        );
      }

      // replace sidebar section name for k6 js api pages
      let sectionName = formatSectionName(docSection);

      if (slug.startsWith('javascript-api/')) {
        sectionName = 'k6 API';
        breadcrumbs = breadcrumbs.map((item) => ({
          ...item,
          name: item.name === 'Javascript API' ? 'k6 API' : item.name,
        }));
      }

      // data for github button on the right
      // currently we only show it for jslib and xk6-browser pages
      let githubUrl = null;
      let githubTitle = '';

      // add prefix to jslib pages slugs and sidebar links
      if (slug.startsWith('jslib/')) {
        slug = `javascript-api/${slug}`;

        replacePathsInSidebarTree(
          sidebarTree,
          '/jslib',
          '/javascript-api/jslib',
        );

        githubUrl = 'https://github.com/grafana/jslib.k6.io';
        githubTitle = 'jslib';

        breadcrumbs = breadcrumbs.map((item) => ({
          ...item,
          name: item.name === 'Jslib' ? 'jslib' : item.name,
          path: item.path.replace('/jslib', '/javascript-api/jslib'),
        }));
      }

      // add prefix to xk6-browser pages slugs and sidebar links
      if (slug.startsWith('xk6-browser/')) {
        slug = `javascript-api/${slug}`;

        replacePathsInSidebarTree(
          sidebarTree,
          '/xk6-browser',
          '/javascript-api/xk6-browser',
        );

        githubUrl = 'https://github.com/grafana/xk6-browser';
        githubTitle = 'xk6-browser';

        breadcrumbs = breadcrumbs.map((item) => ({
          ...item,
          name: item.name === 'Xk6-browser' ? 'xk6-browser' : item.name,
          path: item.path.replace(
            '/xk6-browser',
            '/javascript-api/xk6-browser',
          ),
        }));
      }

      let hideBreadcrumbs = false;
      if (
        slug === 'javascript-api/jslib/' ||
        slug === 'javascript-api/xk6-browser/'
      ) {
        hideBreadcrumbs = true;
      }

      return {
        path: removeParametersFromJavaScriptAPISlugAndAddToRedirectsArray(
          slug,
          title,
        ),
        component: Path.resolve('./src/templates/doc-page.js'),
        context: {
          sectionName,
          remarkNode: extendedRemarkNode,
          sidebarTree,
          breadcrumbs,
          navLinks: generateTopLevelLinks(topLevelLinks),
          pageVersions,
          githubUrl,
          githubTitle,
          hideBreadcrumbs,
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

      const pageLocale =
        SUPPORTED_LOCALES.find((locale) =>
          strippedDirectory.startsWith(`${locale}/`),
        ) || DEFAULT_LOCALE;

      const slug =
        pageLocale === DEFAULT_LOCALE
          ? getSlug(path)
          : getTranslatedSlug(relativeDirectory, title, pageLocale, 'guides');

      const pageSlug = customSlug ? addTrailingSlash(customSlug) : slug;

      // path collision check
      if (!pathCollisionDetectorInstance.add({ path: slug, name }).isUnique()) {
        // skip the page creation if there is already a page with identical url
        return false;
      }

      // generate breadcrumbs
      let breadcrumbs = compose(
        buildBreadcrumbs,
        removeEnPrefix,
        dedupePath,
        unorderify,
      )(path);

      if (pageLocale !== DEFAULT_LOCALE) {
        const translatedPath = translatePath(unorderify(path), pageLocale);

        breadcrumbs = compose(
          buildBreadcrumbs,
          removeEnPrefix,
          dedupePath,
        )(translatedPath);
      }

      const sidebarTree = getGuidesSidebar(pageLocale);

      const pageTranslations = getPageTranslations(
        relativeDirectory,
        name,
        getGuidesSidebar,
        reporter,
      );

      const extendedRemarkNode = {
        ...remarkNode,
        frontmatter: {
          ...frontmatter,
          slug,
          // injection of a link to an article in git repo
          fileOrigin: encodeURI(
            `https://github.com/grafana/k6-docs/blob/main/src/data/${relativeDirectory}/${name}.md`,
          ),
          translations: pageTranslations,
        },
      };

      return {
        path: pageSlug || '/',
        component: Path.resolve('./src/templates/doc-page.js'),
        context: {
          sectionName: 'Guides',
          remarkNode: extendedRemarkNode,
          sidebarTree,
          breadcrumbs: breadcrumbs.filter(
            (item) => !SUPPORTED_LOCALES.includes(item.path.replace(/\//g, '')),
          ),
          navLinks: generateTopLevelLinks(topLevelLinks),
          locale: pageLocale,
        },
      };
    })
    .filter(Boolean);
}

function getJsAPIVersionedPagesProps({
  nodesJsAPI,
  reporter,
  topLevelLinks,
  pathCollisionDetectorInstance,
  getJavascriptAPISidebar,
  getSidebar,
}) {
  // creating actual docs pages
  return nodesJsAPI
    .map(({ relativeDirectory, children: [remarkNode], name }) => {
      const strippedDirectory = relativeDirectory.replace(
        /^.*js-api\/(.*)$/,
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
        frontmatter: {
          title,
          redirect,
          draft,
          slug: customSlug,
          shouldCreatePage,
        },
      } = remarkNode;

      // if there is a value in redirect field, skip page creation
      // OR there is draft flag and mode is prod
      if (
        (draft === 'true' && isProduction) ||
        redirect ||
        shouldCreatePage === false
      ) {
        return false;
      }
      const path = `${strippedDirectory}/${title.replace(/\//g, '-')}`;

      const pageVersion = SUPPORTED_VERSIONS.find((version) =>
        strippedDirectory.startsWith(version),
      );

      if (
        !isProduction &&
        !SUPPORTED_VERSIONS_FOR_BUILD.includes(pageVersion)
      ) {
        return null;
      }

      const slug = getSlug(path);

      const pageSlug = customSlug
        ? getVersionedCustomSlug(addTrailingSlash(customSlug), pageVersion)
        : slug;

      // path collision check
      if (
        !pathCollisionDetectorInstance.add({ path: pageSlug, name }).isUnique()
      ) {
        // skip the page creation if there is already a page with identical url
        return false;
      }

      const sidebarTree =
        getJavascriptAPISidebar(pageVersion).children['javascript api'];

      const extendedRemarkNode = {
        ...remarkNode,
        frontmatter: {
          ...frontmatter,
          slug,
          // injection of a link to an article in git repo
          fileOrigin: encodeURI(
            `https://github.com/grafana/k6-docs/blob/main/src/data/${relativeDirectory}/${name}.md`,
          ),
        },
      };

      const pathForBreadcrumbs = compose(dedupePath, unorderify)(path);

      let breadcrumbs = buildBreadcrumbs(pathForBreadcrumbs, true);
      breadcrumbs = breadcrumbs.map((item) =>
        item.path.endsWith(`/javascript-api/`)
          ? {
              path: item.path,
              name: 'Javascript API',
            }
          : item,
      );

      breadcrumbs = breadcrumbs.filter(
        (item) => item.path !== '/' && item.path !== `/${pageVersion}/`,
      );

      const pageVersions = getPageVersions(
        getSidebar,
        getJavascriptAPISidebar,
        relativeDirectory,
        name,
        pageVersion,
      );

      return {
        path: removeParametersFromJavaScriptAPISlugAndAddToRedirectsArray(
          dotifyVersion(pageSlug) || '/',
          title,
        ),
        component: Path.resolve('./src/templates/doc-page.js'),
        context: {
          sectionName: 'Javascript API',
          remarkNode: extendedRemarkNode,
          sidebarTree,
          breadcrumbs,
          navLinks: generateTopLevelLinks(topLevelLinks),
          version: pageVersion,
          pageVersions,
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
                  redirectTarget
                  hideFromSidebar
                  draft
                  shouldCreatePage
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
                  redirectTarget
                  hideFromSidebar
                  draft
                  shouldCreatePage
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

async function fetchJavascriptAPIPagesData(graphql) {
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
            relativeDirectory: { regex: "/versioned-js-api/" }
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
                  redirectTarget
                  hideFromSidebar
                  draft
                  shouldCreatePage
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
  nodesJsAPI,
  javascriptAPISidebar,
  actions,
  reporter,
}) {
  // initiating path collision checker
  const pathCollisionDetectorInstance = pathCollisionDetector(reporter.warn);

  // local helper function that uses currying, expects one more arg
  const getSidebar = getChildSidebar(sidebar);

  // local helper function that uses currying, expects one more arg
  const getGuidesSidebar = getChildSidebar(guidesSidebar);

  const getJavascriptAPISidebar = getChildSidebar(javascriptAPISidebar);

  // create data for rendering docs navigation
  const topLevelNames = Object.keys(sidebar.children).filter(
    (name) => name !== 'xk6-browser' && name !== 'jslib',
  );

  const topLevelLinks = topLevelNames
    .filter((name) => name !== 'Cloud REST API')
    .map((name) => ({
      label: name === 'cloud' ? 'Cloud Docs' : name.toUpperCase(),
      to: name === 'guides' ? `/` : `/${slugify(name)}/`,
    }));

  getDocPagesProps({
    nodes,
    reporter,
    topLevelLinks,
    pathCollisionDetectorInstance,
    getSidebar,
    getJavascriptAPISidebar,
  })
    .concat(
      getGuidesPagesProps({
        nodesGuides,
        reporter,
        topLevelLinks,
        pathCollisionDetectorInstance,
        getGuidesSidebar,
      }),
      getJsAPIVersionedPagesProps({
        nodesJsAPI,
        reporter,
        topLevelLinks,
        pathCollisionDetectorInstance,
        getJavascriptAPISidebar,
        getSidebar,
      }),
      getTopLevelPagesProps({
        topLevelNames,
        topLevelLinks,
        getSidebar,
        getGuidesSidebar,
        getJavascriptAPISidebar,
        pathCollisionDetectorInstance,
      }),
      getSupplementaryPagesProps({
        topLevelNames,
        topLevelLinks,
        getSidebar,
        getGuidesSidebar,
        getJavascriptAPISidebar,
        reporter,
      }),
    )
    .map((pageProps) => actions.createPage(pageProps));
}

const createRedirects = ({ actions }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: '/getting-started/welcome/',
    toPath: '/',
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/es/empezando/bienvenido/',
    toPath: '/es/',
    redirectInBrowser: true,
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/analyzing-results/logs-tab/',
    toPath: '/cloud/analyzing-results/logs/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/cloud-faq/calculating-virtual-uses-with-google-analytics',
    toPath: 'https://k6.io/blog/monthly-visits-concurrent-users',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/getting-started/community/',
    toPath: 'https://k6.io/community/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/es/empezando/comunidad/',
    toPath: 'https://k6.io/community/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/project-and-team-management/usage-reports/',
    toPath: '/cloud/manage/usage-reports/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/integrations/notifications/',
    toPath: '/cloud/manage/notifications/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/project-and-team-management/thresholds/',
    toPath: '/cloud/manage/thresholds/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/integrations/cloud-apm/prometheus-remote-write/',
    toPath: '/cloud/integrations/prometheus-remote-write/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/cloud/creating-and-running-a-test/scheduling-tests/',
    toPath: '/cloud/manage/scheduled-tests/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/ecosystem/',
    toPath: '/extensions/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/ecosystem/bundle-builder/',
    toPath: '/extensions/getting-started/bundle/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/misc/k6-extensions/',
    toPath: '/extensions/guides/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/extensions/bundle-builder/',
    toPath: '/extensions/getting-started/bundle/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/extensions/explore/',
    toPath: '/extensions/getting-started/explore/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/extensions/guides/getting-started/',
    toPath: '/extensions/guides/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/extensions/guides/what-are-k6-extensions/',
    toPath: '/extensions/',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/integrations/k6-extensions/',
    toPath: '/extensions/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/project-and-team-management/team-members/',
    toPath: '/cloud/project-and-team-management/members/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/project-and-team-management/azure-ad-saml-sso/',
    toPath: '/cloud/project-and-team-management/saml-sso/azure-ad/',
    redirectInBrowser: true,
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/using-k6/options/',
    toPath: '/using-k6/k6-options/reference/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/analyzing-results/thresholds-tab/',
    toPath: '/cloud/analyzing-results/thresholds',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/analyzing-results/checks-tab/',
    toPath: '/cloud/analyzing-results/checks',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/analyzing-results/http-tab/',
    toPath: '/cloud/analyzing-results/http',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/analyzing-results/performance-trending/',
    toPath: '/cloud/analyzing-results/test-comparison',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/billing-user-menu/billing',
    toPath: '/cloud/your-plan/billing',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/billing-user-menu/data-retention/',
    toPath: '/cloud/your-plan/about-data-retention/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/billing-user-menu/subscription/',
    toPath: '/cloud/your-plan/manage-subscription/',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/cloud-faq/pricing-questions/',
    toPath: '/cloud/your-plan/pricing-questions',
    isPermanent: true,
  });

  createRedirect({
    fromPath: '/cloud/cloud-faq/general-questions/',
    toPath: '/cloud/',
  });

  const redirects = {
    '/javascript-api/k6-http/cookiejar-k6-http':
      '/javascript-api/k6-http/cookiejar/',
    '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-cookiesforurl-url':
      '/javascript-api/k6-http/cookiejar/cookiejar-cookiesforurl-url/',
    '/javascript-api/k6-http/cookiejar-k6-http/cookiejar-set-name-value-options':
      '/javascript-api/k6-http/cookiejar/cookiejar-set-url-name-value-options/',
    '/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options':
      '/javascript-api/k6-http/cookiejar/cookiejar-set-url-name-value-options/',
    '/javascript-api/k6-http/filedata-k6-http':
      '/javascript-api/k6-http/filedata/',
    '/javascript-api/k6-http/params-k6-http': '/javascript-api/k6-http/params/',
    '/javascript-api/k6-http/response-k6-http':
      '/javascript-api/k6-http/response/',
    '/javascript-api/k6-http/response-k6-http/response-clicklink-params':
      '/javascript-api/k6-http/response/response-clicklink-params/',
    '/javascript-api/k6-http/response-k6-http/response-html':
      '/javascript-api/k6-http/response/response-html/',
    '/javascript-api/k6-http/response-k6-http/response-json-selector':
      '/javascript-api/k6-http/response/response-json-selector/',
    '/javascript-api/k6-http/response-k6-http/response-submitform-params':
      '/javascript-api/k6-http/response/response-submitform-params/',
    '/javascript-api/k6-metrics/counter-k6-metrics':
      '/javascript-api/k6-metrics/counter/',
    '/javascript-api/k6-metrics/gauge-k6-metrics':
      '/javascript-api/k6-metrics/gauge/',
    '/javascript-api/k6-metrics/rate-k6-metrics':
      '/javascript-api/k6-metrics/rate/',
    '/javascript-api/k6-metrics/trend-k6-metrics':
      '/javascript-api/k6-metrics/trend/',
    '/javascript-api/k6-encoding/b64decode-input-encoding/':
      '/javascript-api/k6-encoding/b64decode-input-encoding-format/',
    '/using-k6/archives-for-bundling-sharing-a-test': '/misc/archive-command/',
    '/using-k6/ssl-tls': '/using-k6/protocols/ssl-tls/',
    '/using-k6/ssl-tls/online-certificate-status-protocol-ocsp':
      '/using-k6/protocols/ssl-tls/online-certificate-status-protocol-ocsp/',
    '/using-k6/ssl-tls/ssl-tls-client-certificates':
      '/using-k6/protocols/ssl-tls/ssl-tls-client-certificates/',
    '/using-k6/ssl-tls/ssl-tls-version-and-ciphers':
      '/using-k6/protocols/ssl-tls/ssl-tls-version-and-ciphers/',
    '/using-k6/multipart-requests-file-uploads': '/examples/data-uploads/',
    '/getting-started/results-output/apache-kafka':
      '/results-visualization/apache-kafka/',
    '/getting-started/results-output/cloud': '/results-visualization/cloud/',
    '/results-visualization/k6-cloud-test-results':
      '/results-visualization/cloud/',
    '/getting-started/results-output/datadog':
      '/results-visualization/datadog/',
    '/getting-started/results-output/influxdb':
      '/results-visualization/influxdb-+-grafana/',
    '/getting-started/results-output/json': '/results-visualization/json/',
    '/getting-started/results-output/statsd': '/results-visualization/statsd/',
    '/javascript-api/k6-metrics/counter-k6-metrics/counter-add-value-tags':
      '/javascript-api/k6-metrics/counter/counter-add-value-tags/',
    '/javascript-api/k6-metrics/gauge-k6-metrics/gauge-add-value-tags':
      '/javascript-api/k6-metrics/gauge/gauge-add-value-tags/',
    '/javascript-api/k6-metrics/rate-k6-metrics/rate-add-value-tags':
      '/javascript-api/k6-metrics/rate/rate-add-value-tags/',
    '/javascript-api/k6-metrics/trend-k6-metrics/trend-add-value-tags':
      '/javascript-api/k6-metrics/trend/trend-add-value-tags/',
    '/using-k6/cloud-execution':
      '/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/',
    '/using-k6/html/working-with-html-forms': '/examples/html-forms/',
    '/using-k6/html': '/javascript-api/k6-html/',
    '/using-k6/session-recording-har-support':
      '/test-authoring/recording-a-session/',
    '/cloud/creating-and-running-a-test/test-builder':
      '/test-authoring/test-builder/',
    '/cloud/creating-and-running-a-test/in-app-script-editor':
      '/cloud/creating-and-running-a-test/script-editor/',
    '/cloud/creating-and-running-a-test/recording-a-test-script':
      '/test-authoring/recording-a-session/browser-recorder/',
    '/cloud/creating-and-running-a-test/converters': '/integrations/',
    '/cloud/integrations/ci': '/integrations/',
    '/cloud/cloud-faq/what-is-data-retention':
      '/cloud/billing-user-menu/data-retention/',
    '/cloud/cloud-faq/pricing-faq': '/cloud/cloud-faq/pricing-questions/',
    '/cloud/cloud-faq/what-ip-addresses-are-used-by-the-k6-cloud':
      '/cloud/cloud-faq/general-questions/',
    '/cloud/cloud-faq/what-is-the-best-way-to-debug-my-load-test-scripts':
      '/cloud/cloud-faq/general-questions/',
    '/cloud/cloud-faq/i-was-invited-to-an-organization-and-i-cannot-run-tests':
      '/cloud/cloud-faq/general-questions/',
    '/cloud/cloud-faq/how-to-open-your-firewall-to-k6-cloud-service-for-cloud-executed-tests':
      '/cloud/cloud-faq/general-questions/',
    '/cloud/cloud-faq/test-status-codes': '/cloud/cloud-faq/general-questions/',
    '/cloud/cloud-faq/what-are-vus-virtual-users':
      '/cloud/cloud-faq/general-questions/',
    '/cloud/cloud-faq/data-uploads-with-k6-cloud':
      '/cloud/cloud-faq/general-questions/',
    '/misc/usage-reports': '/misc/usage-collection/',
    '/using-k6/using-node-modules': '/using-k6/modules/',
    '/javascript-api/k6-x-browser/': '/javascript-api/xk6-browser/',
    '/javascript-api/k6-x-browser/browser/':
      '/javascript-api/xk6-browser/browser/',
    '/javascript-api/k6-x-browser/browsercontext/':
      '/javascript-api/xk6-browser/browsercontext/',
    '/javascript-api/k6-x-browser/browsertype/':
      '/javascript-api/xk6-browser/browsertype/',
    '/javascript-api/k6-x-browser/elementhandle/':
      '/javascript-api/xk6-browser/elementhandle/',
    '/javascript-api/k6-x-browser/frame/': '/javascript-api/xk6-browser/frame/',
    '/javascript-api/k6-x-browser/jshandle/':
      '/javascript-api/xk6-browser/jshandle/',
    '/javascript-api/k6-x-browser/keyboard/':
      '/javascript-api/xk6-browser/keyboard/',
    '/javascript-api/k6-x-browser/mouse/': '/javascript-api/xk6-browser/mouse/',
    '/javascript-api/k6-x-browser/page/': '/javascript-api/xk6-browser/page/',
    '/javascript-api/k6-x-browser/request/':
      '/javascript-api/xk6-browser/request/',
    '/javascript-api/k6-x-browser/response/':
      '/javascript-api/xk6-browser/response/',
    '/javascript-api/k6-x-browser/touchscreen/':
      '/javascript-api/xk6-browser/touchscreen/',
    '/javascript-api/k6-x-browser/launcher/':
      '/javascript-api/xk6-browser/launcher/',
    ...newJavascriptURLsRedirects,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(redirects)) {
    createRedirect({
      fromPath: `${key}`,
      toPath: `${value}`,
      isPermanent: true,
    });
    createRedirect({
      fromPath: `${key}/`,
      toPath: `${value}`,
      isPermanent: true,
    });
  }

  // all redirects docs.k6.io
  [
    '/selection-findselector/',
    '/selection-attrname/',
    '/selection-getindex/',
    '/selection-nextselector/',
    '/selection-nextallselector/',
    '/selection-prevallselector/',
    '/selection-parentselector/',
    '/selection-parentsselector/',
    '/selection-prevuntilselector/',
    '/selection-nextuntilselector/',
    '/selection-parentsuntilselector/',
    '/selection-childrenselector/',
    '/selection/',
  ].forEach((item) => {
    createRedirect({
      fromPath: `/javascript-api/k6-html/selection${item}`,
      toPath: '/javascript-api/k6-html/selection/',
      isPermanent: true,
    });
  });

  [
    '/md4-input-outputencoding/',
    '/md5-input-outputencoding/',
    '/sha1-input-outputencoding/',
    '/sha256-input-outputencoding/',
    '/sha384-input-outputencoding/',
    '/sha512-input-outputencoding/',
    '/sha512_224-input-outputencoding/',
    '/sha512_256-input-outputencoding/',
    '/ripemd160-input-outputencoding/',
  ].forEach((item) => {
    createRedirect({
      fromPath: `/javascript-api/6-crypto/hmac${item}`,
      toPath: '/javascript-api/k6-crypto/',
      isPermanent: true,
    });
  });
};

exports.createPages = async (options) => {
  const pagesData = await fetchDocPagesData(options.graphql);
  const guidesData = await fetchGuidesPagesData(options.graphql);
  const javascriptAPIData = await fetchJavascriptAPIPagesData(options.graphql);

  const sidebar = generateSidebar({ nodes: pagesData });
  const guidesSidebar = generateSidebar({ nodes: guidesData, type: 'guides' });
  const javascriptAPISidebar = generateSidebar({
    nodes: javascriptAPIData,
    type: 'javascript-api',
  });

  await createDocPages({
    ...options,
    nodes: pagesData,
    nodesGuides: guidesData,
    sidebar,
    guidesSidebar,
    nodesJsAPI: javascriptAPIData,
    javascriptAPISidebar,
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
    createNodeField({
      node,
      name: 'shouldCreatePage',
      value: node.frontmatter.shouldCreatePage || true,
    });
  }
};
