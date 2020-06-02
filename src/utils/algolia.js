const utils = require('./utils');

const rearrange = (text, chunkLength = 300) => {
  const regex = new RegExp(`.{1,${chunkLength}}`, 'g');
  return text.match(regex) || [];
};

// this copypaste from gatsby-node sidebar node
// generation, we have to
// perform exactly the same operations for algolia

// ensures that no trailing slash is left
const noTrailingSlash = (path) =>
  path === '/' ? '/' : path.replace(/(.+)\/$/, '$1');

// duplication, removing it as well
const dedupeExamples = (path) => path.replace(/examples\/examples/, 'examples');

// no /guides route; welcome is redirecting to root path
// difference from removeGuides: this one is for sidebar links processing and
// the former is for creatingPages
const removeGuidesAndRedirectWelcome = (path) =>
  path.replace(/guides\/(getting-started\/welcome)?/, '');

// helper
const flatten = (arr) =>
  arr
    .map(({ node: { frontmatter, fileAbsolutePath, excerpt, objectID } }) => {
      const strippedDirectory = utils.stripDirectoryPath(
        fileAbsolutePath,
        'docs',
      );
      // cut the last piece (the actual name of a file) to match the generation
      // in node
      const cutStrippedDirectory = strippedDirectory
        .split('/')
        .slice(0, -1)
        .join('/');
      const path = utils.slugify(
        `/${cutStrippedDirectory}/${frontmatter.title.replace(/\//g, '-')}`,
      );
      return rearrange(excerpt).map((piece, i) => ({
        ...frontmatter,
        objectID: `${objectID}-${i}`,
        slug: utils.compose(
          noTrailingSlash,
          dedupeExamples,
          removeGuidesAndRedirectWelcome,
          utils.unorderify,
        )(path),
        content: piece,
      }));
    })
    .flat();

// main query
// keep the length of excerpt really absurd to make sure the article comes in full
const docPagesQuery = `{
  docPages: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
        }
        excerpt(pruneLength: 100000) 
        fileAbsolutePath
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
    transformer: ({ data }) => flatten(data.docPages.edges),
    indexName,
    settings,
  },
];
module.exports = queries;
