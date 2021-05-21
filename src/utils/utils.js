/*
 * General utility functions
 */
const { latinizedCharacters } = require('./latinized-characters');

// container for default export (node-specific action)
const utils = {};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const omit = (names, obj) => {
  const result = {};

  Object.values(obj).forEach((prop) => {
    if (names.includes(prop)) return;
    Object.assign(result[prop], obj[prop]);
  });

  return result;
};

const pick = (names, obj) => {
  const result = {};

  Object.values(obj).forEach((prop) => {
    if (names.includes(prop)) {
      Object.assign(result[prop], obj[prop]);
    }
  });

  return result;
};

// replaces accented characters with latin characters
const latinizeCharacter = (char) =>
  latinizedCharacters[char] ? latinizedCharacters[char] : char;

// transforms path-like strings into slugs
// slugify(path: String) -> String
const slugify = (path) =>
  path
    .toLowerCase()
    .replace(/[\s-;:!?&,()[\]]{1,}/g, '-')
    .replace(/[%@~`'"]/g, '')
    .replace(/(-{1,})?(\.md)?$/, '') // removes parts like "*-.md" or "*.md" or "-" postfix
    .replace(/[^A-Za-z0-9]/g, latinizeCharacter)
    .replace(/(\/)-{1,}/g, '$1') // removed '-' prefix from any path part
    .replace(/\./g, '-'); // replace dots with '-' after we removed extension

// takes a nested object with file nodes and returns an array of values;
// childrenToList(children: Object) -> Array
const childrenToList = (children) => Object.values(children);

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
            acc.length + cur.length + 1 > ln - 4 ? acc : `${acc} ${cur}`,
          '',
        )
        .concat(' ...');

// takes a path string and a type of path and trims redundant directories according to a type
// stripDirectoryPath(str: String, type?: String) -> String
const stripDirectoryPath = (str, type) => {
  switch (type) {
    case 'docs':
      return str.replace(/^.*docs\/(.*)$/, '$1');
    case 'guides':
      return str.replace(/^.*guides\/(.*)$/, '$1');
    case 'javascript-api':
      return str.replace(/^.*js-api\/(.*)$/, '$1');
    case 'post':
      return str.replace(/(.*)(\d{4}-\d{2}-\d{2}.*)(\/.*\.\w+$)/, '$2');
    default:
      return str;
  }
};

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

// basic compose function
const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

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
    // eslint-disable-next-line no-plusplus
    while (++index < length) {
      // eslint-disable-next-line no-use-before-define
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

// es5 tricky alternative to .flat
// !warninng: support only 1 level deep
// eslint-disable-next-line prefer-spread
const flat = (arrays) => [].concat.apply([], arrays);

Object.defineProperties(utils, {
  mdxAstToPlainText: {
    value: mdxAstToPlainText,
  },
  isInIFrame: {
    value: isInIFrame,
  },
  slugify: {
    value: slugify,
  },
  childrenToList: {
    value: childrenToList,
  },
  flat: {
    value: flat,
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
  compose: {
    value: compose,
  },
  whenElementAvailable: {
    value: whenElementAvailable,
  },
  pick: {
    value: pick,
  },
  omit: {
    value: omit,
  },
  capitalize: {
    value: capitalize,
  },
});

module.exports = utils;
