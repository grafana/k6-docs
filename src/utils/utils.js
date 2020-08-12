/*
 * General utility functions
 */

// container for default export (node-specific action)
const utils = {};

// getRandomNumberBetween(min: Number = 1, max: Number = 10) -> Number
const getRandomNumberBetween = (min = 1, max = 10) => {
  const [rangeStart, rangeFinish] = [Math.ceil(min), Math.ceil(max)];

  return (
    Math.floor(Math.random() * (rangeFinish - rangeStart + 1)) + rangeStart
  );
};

// transforms path-like strings into slugs
// slugify(path: String) -> String
const slugify = (path) =>
  path
    .toLowerCase()
    .replace(/[\s-;:!?&,()[\]]{1,}/g, '-')
    .replace(/[%@~`'"]/g, '')
    .replace(/(-{1,})?(\.md)?$/, '') // removes parts like "*-.md" or "*.md" or "-" postfix
    .replace(/(\/)-{1,}/g, '$1') // removed '-' prefix from any path part
    .replace(/\./g, '-'); // replace dots with '-' after we removed extension

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
    parts.push(name);
    parts.forEach((part) => {
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

// takes a nested object with file nodes and returns an array of values;
// childrenToList(children: Object) -> Array
const childrenToList = (children) => Object.values(children);

// takes a string like 'docs/001-Directory/01-file' or just '001-Directory'
// and removes all the order numbers like 'docs/Directory/file' or 'Directory'
// unorderify(str: String, nameOnly?: Bool) -> String
const unorderify = (str, nameOnly = false) => {
  const unorderEntry = (entry) => entry.replace(/^(\d*\W*)(\.*)/, '$2');
  return nameOnly
    ? unorderEntry(str)
    : str.split('/').map(unorderEntry).join('/');
};

// makes a consequence of random digits in form of a string to be served as a key prop
// getRandomKey() -> String
const getRandomKey = () => `k${Math.random().toString().replace('.', '')}`;

// takes a path string and a type of path and trims redundant directories according to a type
// stripDirectoryPath(str: String, type?: String) -> String
const stripDirectoryPath = (str, type) => {
  switch (type) {
    case 'docs':
      return str.replace(/^.*docs\/(.*)$/, '$1');
    case 'post':
      return str.replace(/(.*)(\d{4}-\d{2}-\d{2}.*)(\/.*\.\w+$)/, '$2');
    default:
      return str;
  }
};

// takes a string and an the desired length to which string should be trimmed;
// return trimmed string with word wrapping on white spaces and an ellipsis at the end
// trimToLengthWithEllipsis(str: String, ln?: Number) -> String
const trimToLengthWithEllipsis = (str, ln = 140) =>
  str.length <= ln
    ? str
    : str
        .split(' ')
        .reduce(
          (acc, cur) =>
            acc.length + cur.length + 1 > ln - 4 ? acc : (acc += ` ${cur}`),
          '',
        )
        .concat(' ...');

// post manipulation related function that extracts a date and a path
// from given path
// getDateAndSlugFromPath(path: String) -> Object
const getDateAndSlugFromPath = (path) => {
  const [date, slug] = stripDirectoryPath(path, 'post').split('--');
  return { date, slug: slugify(slug) };
};

// post manipulation related function that determines how to deal with cta button based on given frontmatter value
// getCurrentCta(ctaData: Array, ctaType: String|Null) -> Object
const getCurrentCta = (ctaData, ctaType) => {
  switch (ctaType) {
    case 'none':
      return false;
    case null:
      return ctaData.find(({ node: { type } }) => type === 'default').node;
    default:
      return ctaData.find(({ node: { type } }) => type === ctaType).node;
  }
};

// seo-compoenent-specific fn that creates correct path for the og:image
// createMetaImagePath(image: Object|String, defautlSiteUrl: String, defaultImage: String) -> String
const createMetaImagePath = (image, defaultSiteUrl, defaultImage) => {
  switch (typeof image) {
    case 'object':
      return defaultSiteUrl + image.childImageSharp.fluid.src;
    case 'string':
      return defaultSiteUrl + image;
    default:
      return defaultSiteUrl + defaultImage;
  }
};

// creating-docs-pages-specific function; extracts the category after
// 'docs'; e.g. /whatever/some-more -> whatever
// getDocSection(str: String) -> String
const getDocSection = (str) => str.replace(/^(.*?)\/.*$/, '$1');

// docs-sidebar-specific function; extracts a certain part of a sidebar which
// which root key matches passed child
// getChildSidebar(sidebar: Object -> child: String) -> Object
const getChildSidebar = (sidebar) => (child) => sidebar.children[child];

// basic compose function
const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const noSlugDuplication = (indexEntry, slug) => {
  const src = indexEntry.module.props.children[1].props.content;
  const check = src.includes(slug);
  return !check;
};

// this function takes CSSSelector and callback which
// is being executed as soon as passed selector matches DOM element
const whenElementAvailable = (elementSelector) => (cb) =>
  document.querySelector(elementSelector)
    ? cb(document.querySelector(elementSelector))
    : setTimeout(() => whenElementAvailable(elementSelector)(cb), 100);

// simple fn that determines if the page is being rendered
// into an iframe
const isInIFrame = () =>
  typeof window !== 'undefined' && window.location !== window.parent.location;

// accepts a logger (reporter, console.log)
// and returns a set of functions
// to perform the path collision detection
const pathCollisionDetector = (logger) => {
  /* paths store */
  const PATHS = [];
  /* private functions */

  // shout message template
  const buildWarning = ({ current, stored }) =>
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

// Get the text content of a node.
// Prefer the node’s plain-text fields, otherwise serialize its children,
// and if the given value is an array, serialize the nodes in it.
const mdxAstToPlainText = (ast) => {
  function $jsxToText(rawBody) {
    return (
      rawBody
        // remove html tags
        .replace(/<[^>]*>/g, '')
        // remove line feeds with a single space
        .replace(/\n{1,}/g, ' ')
    );
  }
  function $all(values) {
    const result = [];
    const { length } = values;
    let index = -1;
    while (++index < length) {
      result[index] = $toString(values[index]);
    }

    return result.join(' ');
  }

  function $toString(node) {
    const omitNodeTypes = ['import', 'export', 'comment', 'code'];
    if (node) {
      const { value, alt, title, children, type, length } = node;
      const shouldProcessType = type && !omitNodeTypes.includes(type);
      return (
        (shouldProcessType && (type === 'jsx' ? $jsxToText(value) : value)) ||
        (shouldProcessType && alt) ||
        (shouldProcessType && title) ||
        (shouldProcessType && children && $all(children)) ||
        (shouldProcessType && length && $all(node)) ||
        ''
      );
    }
    return '';
  }
  return $toString(ast);
};

/*
 * custom path processing rules, gatsby-node specific
 */

// guides category is the root: / or /docs in prod, so we removing that part
const removeGuides = (path) => path.replace(/guides\//i, '');

// removes duplicates from path, e.g.
// examples/examples -> examples
const dedupePath = (path) => Array.from(new Set(path.split('/'))).join('/');

// no /guides route; welcome is redirecting to the root path
// difference from removeGuides: this one is for sidebar links processing and
// the former is for creatingPages
const removeGuidesAndRedirectWelcome = (path) =>
  path.replace(/guides\/(getting-started\/welcome)?/i, '');

// ensures that no trailing slash is left
const noTrailingSlash = (path) =>
  path === '/' ? '/' : path.replace(/(.+)\/$/, '$1');

Object.defineProperties(utils, {
  mdxAstToPlainText: {
    value: mdxAstToPlainText,
  },
  noTrailingSlash: {
    value: noTrailingSlash,
  },
  removeGuidesAndRedirectWelcome: {
    value: removeGuidesAndRedirectWelcome,
  },
  dedupePath: {
    value: dedupePath,
  },
  removeGuides: {
    value: removeGuides,
  },
  isInIFrame: {
    value: isInIFrame,
  },
  getRandomNumberBetween: {
    value: getRandomNumberBetween,
  },
  slugify: {
    value: slugify,
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
  childrenToList: {
    value: childrenToList,
  },
  getRandomKey: {
    value: getRandomKey,
  },
  stripDirectoryPath: {
    value: stripDirectoryPath,
  },
  trimToLengthWithEllipsis: {
    value: trimToLengthWithEllipsis,
  },
  getDateAndSlugFromPath: {
    value: getDateAndSlugFromPath,
  },
  getCurrentCta: {
    value: getCurrentCta,
  },
  createMetaImagePath: {
    value: createMetaImagePath,
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
  compose: {
    value: compose,
  },
  noSlugDuplication: {
    value: noSlugDuplication,
  },
  whenElementAvailable: {
    value: whenElementAvailable,
  },
  pathCollisionDetector: {
    value: pathCollisionDetector,
  },
});

module.exports = utils;
