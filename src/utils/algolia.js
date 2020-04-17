const utils = require('./utils');
// this copypaste from gatsby-node sidebar node
// generation, we have to
// perform exactly the same operations for algolia

// ensures that no trailing slash is left
const noTrailingSlash = path =>
  path === '/' ? '/' : path.replace(/(.+)\/$/, '$1');

// duplication, removing it as well
const dedupeExamples = path => path.replace(/examples\/examples/, 'examples');

// no /guides route; welcome is redirecting to root path
// difference from removeGuides: this one is for sidebar links processing and
// the former is for creatingPages
const removeGuidesAndRedirectWelcome = path =>
  path.replace(/guides\/(getting-started\/welcome)?/, '');

// helper
const flatten = arr =>
  arr.map(({ node: { frontmatter, fileAbsolutePath, ...rest } }) => {
    const strippedDirectory = utils.stripDirectoryPath(
      fileAbsolutePath,
      'docs',
    );
    // cut the last piece (the actual name of a file) to match the generation
    // in node
    const cuttedStrippedDirectory = strippedDirectory
      .split('/')
      .slice(0, -1)
      .join('/');
    const path = utils.slugify(
      `/${cuttedStrippedDirectory}/${frontmatter.title.replace(/\//g, '-')}`,
    );
    return {
      ...frontmatter,
      ...rest,
      // slug: utils.unorderify(path).replace(/guides\//, ''),
      slug: utils.compose(
        noTrailingSlash,
        dedupeExamples,
        removeGuidesAndRedirectWelcome,
        utils.unorderify,
      )(path),
    };
  });

// main query
const docPagesQuery = `{
  docPages: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          category
        }
        excerpt(pruneLength: 5000)
        fileAbsolutePath
      }
    }
  }
}`;

// additional config
const settings = { attributesToSnippet: ['excerpt:20'] };

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
