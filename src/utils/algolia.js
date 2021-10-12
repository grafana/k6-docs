/* eslint-disable no-useless-escape */
const { I18N_CONFIG } = require('../i18n/i18n-config');

const chunk = require('./chunk-text');
const { stripDirectoryPath, mdxAstToPlainText, flat } = require('./utils');
const {
  getSlug,
  getTranslatedSlug,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
} = require('./utils.node');

const processMdxEntry = (
  { children: [entry], relativeDirectory },
  kind = 'docs',
) => {
  const {
    mdxAST,
    objectID,
    frontmatter: { title, redirect, slug: customSlug },
  } = entry;
  if (redirect) {
    // avoid pushing empty records
    return [];
  }
  /* @TODO: remove if clause after cloud rest api docs will be ported ,
   * avoid indexing this section for a while to avoid
   * search user's confusion
   */
  if (/cloud rest api/i.test(relativeDirectory)) {
    // eslint-disable-next-line no-console
    console.log('exluded from algolia indecies pages:', relativeDirectory);
    return [];
  }

  // @TODO: remove to enable sending spanish content to Algolia
  if (I18N_CONFIG.hideEsFromAlgoliaSearch) {
    if (/\/es\//i.test(relativeDirectory)) {
      // eslint-disable-next-line no-console
      console.log('exluded ES page from algolia indecies:', relativeDirectory);
      return [];
    }
  }

  const strippedDirectory = stripDirectoryPath(relativeDirectory, kind);
  // cut the last piece (the actual name of a file) to match the generation in node
  const path = `/${strippedDirectory}/${title.replace(/\//g, '-')}`;

  const pageLocale =
    SUPPORTED_LOCALES.find((locale) => path.startsWith(`/${locale}/`)) ||
    DEFAULT_LOCALE;

  const isNotGuidesPage = !(path.startsWith('/en/') || path.startsWith('/es/'));

  let pageTags = [pageLocale];

  // non-guides page should searchable in both ES and EN
  if (isNotGuidesPage) {
    pageTags = ['en', 'es'];
  }

  const slug =
    pageLocale === DEFAULT_LOCALE
      ? getSlug(path)
      : getTranslatedSlug(strippedDirectory, title, pageLocale, 'guides');

  const pageSlug = customSlug || slug;
  const chunks = chunk(mdxAstToPlainText(mdxAST), 300);
  let pointer = chunks.length;
  const cache = new Array(pointer);
  // eslint-disable-next-line no-plusplus
  while (pointer--) {
    cache[pointer] = {
      title,
      objectID: `${objectID}-${pointer}`,
      slug: pageSlug.startsWith('/') ? pageSlug : `/${pageSlug}`,
      content: chunks[pointer],
      _tags: pageTags,
    };
  }
  return cache;
};

// auxiliary flattening fn
const flatten = (arr, kind = 'docs') => {
  let pointer = arr.length;
  const cache = new Array(pointer);
  // eslint-disable-next-line no-plusplus
  while (pointer--) {
    cache[pointer] = processMdxEntry(arr[pointer], kind);
  }
  return flat(cache);
};

// main query
const docPagesQuery = `{
  docPages: allFile(
    filter: { relativeDirectory: { regex: "/\/docs\//" }, ext:{in: [".md"]} }
  ) {
    nodes {
      relativeDirectory
      children {
        ... on Mdx {
        objectID: id
        frontmatter {
          title
          redirect
          slug
        }
        mdxAST
      }
    }
  }
}
}`;

// translated guides
const guidesPagesQuery = `{
  guidesPages: allFile(
    filter: { relativeDirectory: { regex: "/\/translated-guides\//" }, ext:{in: [".md"]} }
  ) {
    nodes {
      relativeDirectory
      children {
        ... on Mdx {
        objectID: id
        frontmatter {
          title
          redirect
          slug
        }
        mdxAST
      }
    }
  }
}
}`;

// additional config
const settings = {
  attributesToSnippet: ['content:20'],
  attributeForDistinct: 'title',
  distinct: true,
};

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME || 'k6_docs';

const queries = [
  {
    query: docPagesQuery,
    transformer: ({ data }) => flatten(data.docPages.nodes),
    indexName,
    settings,
  },
  {
    query: guidesPagesQuery,
    transformer: ({ data }) => flatten(data.guidesPages.nodes, 'guides'),
    indexName,
    settings,
  },
];
module.exports = queries;
