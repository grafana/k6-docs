/* gatsby-node.js specific helper functions */
const { translations } = require('./path-translations');
const { slugify } = require('./utils');

// default 'en' is not included
const SUPPORTED_LOCALES = ['es', 'en'];

// create a container;
const utils = {};

// buildBreadcrumbs(path: String) -> Array<Object>
const buildBreadcrumbs = (path) => {
  let accumulatedPath = '';
  return path.split('/').map((part, i) => {
    accumulatedPath += `/${part}`;
    const slug = slugify(accumulatedPath);
    let name;
    if (i === 0) {
      name = new RegExp(/javascript api/i).test(part)
        ? 'Javascript API'
        : part.slice(0, 1).toUpperCase() + part.slice(1);
    } else if (i === 1) {
      name = new RegExp(/k6-/i).test(part) ? part.replace(/-/g, '/') : part;
    } else {
      name = part;
    }
    return {
      name,
      path: slug,
    };
  });
};

// builds a single file tree node
// buildFileTreeNode(name: String) -> Object
const buildFileTreeNode = (name, meta = {}, children = {}) => ({
  name,
  meta,
  children,
});

// creates a file tree structure
// buildFileTree(nodeBuild: Function) -> Object
const buildFileTree = (nodeBuilder) => {
  const root = nodeBuilder('_root');

  const addNode = (path, name, meta = {}) => {
    let parent = root;
    const parts = path.split('/');

    const locale = SUPPORTED_LOCALES.find((loc) => parts.includes(loc)) || 'en';

    parts.push(name);
    parts.forEach((part) => {
      if (
        parent.children === undefined ||
        parent.children[part] === undefined
      ) {
        // add translated folder name to meta.title for each node in tree
        const translatedName =
          translations[part] !== undefined && locale !== 'en'
            ? translations[part][locale]
            : part;
        parent.children[part] = nodeBuilder(part, { title: translatedName });
      }
      parent.children[part] = parent.children[part] || nodeBuilder(part);
      parent = parent.children[part];
    });

    parent.meta = { ...meta };
  };

  const getTree = () => root;

  return {
    root,
    addNode,
    getTree,
  };
};

// takes a string like 'docs/001-Directory/01-file' or just '001-Directory'
// and removes all the order numbers like 'docs/Directory/file' or 'Directory'
// unorderify(str: String, nameOnly?: Bool) -> String
const unorderify = (str, nameOnly = false) => {
  const unorderEntry = (entry) => entry.replace(/^(\d*\W*)(\.*)/, '$2');
  return nameOnly
    ? unorderEntry(str)
    : str.split('/').map(unorderEntry).join('/');
};

// creating-docs-pages-specific function; extracts the category after
// 'docs'; e.g. /whatever/some-more -> whatever
// getDocSection(str: String) -> String
const getDocSection = (str) => str.replace(/^(.*?)\/.*$/, '$1');

const removeLocaleFromPath = (str) => {
  let res = str;
  SUPPORTED_LOCALES.forEach((locale) => {
    if (str.startsWith(`${locale}/`)) {
      res = str.replace(`${locale}/`, '');
    }
  });
  return res;
};

// extracts a certain part of a sidebar which
// which root key matches passed child
// getChildSidebar(sidebar: Object -> child: String) -> Object
const getChildSidebar = (sidebar) => (child, locale = null) =>
  locale ? sidebar.children[locale].children[child] : sidebar.children[child];

// accepts a logger (reporter, console.log)
// and returns a set of functions
// to perform the path collision detection
const pathCollisionDetector = (logger) => {
  /* paths store */
  const PATHS = [];
  /* private functions */

  // shout message template
  const buildWarning = ({ current, stored }) =>
    // eslint-disable-next-line max-len
    `\n\n### ATTENTION!\n\nDetected path collision at the following files:\n\nFile 1: name: ${stored.name}, path: ${stored.path}, status: CREATED  \nFile 2: name: ${current.name}, path: ${current.path}, status: ATTEMPT TO CREATE \nSKIPPING PAGE CREATION OF FILE 2\n\nMost likely the reason for collision is the 'title' fields in frontmatter area that became identic after slugifying. Consider changing it, using 'slug' field of frontmatter to override default path generation or contact the developer team.\n\n`;
  // check if the path already exist in collection
  const contains = (path) => PATHS.some(({ path: $path }) => $path === path);
  // get an pathMeta entity
  const get = (path) => PATHS.find((pathMeta) => pathMeta.path === path);

  /* public functions */
  // puts path into the storage if there is no such yet
  // otherwise loggs warning message
  const add = ({ name, path }) => {
    if (contains(path)) {
      logger(buildWarning({ current: { name, path }, stored: get(path) }));
      return {
        isUnique: () => false,
      };
    }
    PATHS.push({ name, path });
    return {
      isUnique: () => true,
    };
  };
  return {
    add,
  };
};

// guides category is the root: / or /docs in prod, so we removing that part
const removeGuides = (path) =>
  path.replace(/guides\//i, '').replace(/guías\//i, '');

// removes duplicates from path, e.g.
// examples/examples -> examples
const dedupePath = (path) => Array.from(new Set(path.split('/'))).join('/');

// no /guides route; welcome is redirecting to the root path
// difference from removeGuides: this one is for sidebar links processing and
// the former is for creatingPages
const removeGuidesAndRedirectWelcome = (path) =>
  path
    .replace(/guides\/(getting-started\/welcome)?/i, '')
    .replace(/guías\/(empezando\/bienvenido)?/i, '');

// ensures that no trailing slash is left
const noTrailingSlash = (path) =>
  path === '/' ? '/' : path.replace(/(.+)\/$/, '$1');

Object.defineProperties(utils, {
  noTrailingSlash: {
    value: noTrailingSlash,
  },
  removeGuidesAndRedirectWelcome: {
    value: removeGuidesAndRedirectWelcome,
  },
  dedupePath: {
    value: dedupePath,
  },
  buildBreadcrumbs: {
    value: buildBreadcrumbs,
  },
  buildFileTreeNode: {
    value: buildFileTreeNode,
  },
  buildFileTree: {
    value: buildFileTree,
  },
  removeGuides: {
    value: removeGuides,
  },
  unorderify: {
    value: unorderify,
  },
  getDocSection: {
    value: getDocSection,
  },
  getChildSidebar: {
    value: getChildSidebar,
  },
  pathCollisionDetector: {
    value: pathCollisionDetector,
  },
  SUPPORTED_LOCALES: {
    value: SUPPORTED_LOCALES,
  },
  removeLocaleFromPath: {
    value: removeLocaleFromPath,
  },
});

module.exports = utils;
