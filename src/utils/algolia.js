/* eslint-disable no-useless-escape */
const chunk = require('chunk-text');

const {
  slugify,
  stripDirectoryPath,
  compose,
  mdxAstToPlainText,
  flat,
} = require('./utils');
const { unorderify, noTrailingSlash, dedupePath } = require('./utils.node');

const processMdxEntry = ({ children: [entry] }, kind = 'docs') => {
  const {
    fileAbsolutePath,
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
  if (/cloud rest api/i.test(fileAbsolutePath)) {
    // eslint-disable-next-line no-console
    console.log('exluded from algolia indecies pages:', fileAbsolutePath);
    return [];
  }

  if (/\/es\//i.test(fileAbsolutePath)) {
    // eslint-disable-next-line no-console
    console.log('exluded ES page from algolia indecies:', fileAbsolutePath);
    return [];
  }

  const strippedDirectory = stripDirectoryPath(fileAbsolutePath, kind);
  // cut the last piece (the actual name of a file) to match the generation
  // in node
  const cutStrippedDirectory = strippedDirectory
    .split('/')
    // remove en/ prefix from slug
    .filter((part) => part !== 'en')
    .slice(0, -1)
    .join('/');
  const path = `/${cutStrippedDirectory}/${title.replace(/\//g, '-')}`;
  const slug =
    customSlug ||
    compose(noTrailingSlash, dedupePath, unorderify, slugify)(path);
  const chunks = chunk(mdxAstToPlainText(mdxAST), 300);
  let pointer = chunks.length;
  const cache = new Array(pointer);
  // eslint-disable-next-line no-plusplus
  while (pointer--) {
    cache[pointer] = {
      title,
      objectID: `${objectID}-${pointer}`,
      slug,
      content: chunks[pointer],
    };
  }
  return cache;
};

// auxilary flattening fn
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
    filter: { absolutePath: { regex: "/\/docs\//" }, ext:{in: [".md"]} }
  ) {
    nodes {
      children {
        ... on Mdx {
        objectID: id
        frontmatter {
          title
          redirect
          slug
        }
        mdxAST
        fileAbsolutePath
      }
    }
  }
}
}`;

// translated guides
const guidesPagesQuery = `{
  guidesPages: allFile(
    filter: { absolutePath: { regex: "/\/translated-guides\//" }, ext:{in: [".md"]} }
  ) {
    nodes {
      children {
        ... on Mdx {
        objectID: id
        frontmatter {
          title
          redirect
          slug
        }
        mdxAST
        fileAbsolutePath
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

const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME || 'dev_k6_docs';

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
