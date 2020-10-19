const chunk = require('chunk-text');

const {
  unorderify,
  slugify,
  stripDirectoryPath,
  compose,
  noTrailingSlash,
  dedupePath,
  removeGuidesAndRedirectWelcome,
  mdxAstToPlainText,
  flat,
} = require('./utils');

const processMdxEntry = ({ children: [entry] }) => {
  const {
    fileAbsolutePath,
    mdxAST,
    objectID,
    frontmatter: { title, redirect },
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

  const strippedDirectory = stripDirectoryPath(fileAbsolutePath, 'docs');
  // cut the last piece (the actual name of a file) to match the generation
  // in node
  const cutStrippedDirectory = strippedDirectory
    .split('/')
    .slice(0, -1)
    .join('/');
  const path = `/${cutStrippedDirectory}/${title.replace(/\//g, '-')}`;
  const slug = compose(
    noTrailingSlash,
    dedupePath,
    removeGuidesAndRedirectWelcome,
    unorderify,
    slugify,
  )(path);
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
const flatten = (arr) => {
  let pointer = arr.length;
  const cache = new Array(pointer);
  // eslint-disable-next-line no-plusplus
  while (pointer--) {
    cache[pointer] = processMdxEntry(arr[pointer]);
  }
  return flat(cache);
};

// main query
const docPagesQuery = `{
  docPages: allFile(
    filter: { absolutePath: { regex: "/docs/" }, ext:{in: [".md"]} }
  ) {
    nodes {
      children {
        ... on Mdx {
        objectID: id
        frontmatter {
          title
          redirect
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
];
module.exports = queries;
