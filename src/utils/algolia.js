const utils = require('./utils');

// @TODO optimize chunking
const rearrange = (text, chunkLength = 300) => {
  const regex = new RegExp(`.{1,${chunkLength}}`, 'g');
  return text.match(regex) || [];
};
// @TODO: make it work properly
// cleaning up function, synchronously strips html, markdown and so on
// const rawToText_ = (rawBody) =>
//   rawBody
//     // remove imports
//     .replace(/\nimport.*?;\n/g, '')
//     // remove frontmatter
//     .replace(/(---).*?\1/gs, '')
//     // remove html tags
//     .replace(/<[^>]*>/g, '')
//     // Remove setext-style headers
//     .replace(/^[=\-]{2,}\s*$/g, '')
//     // Remove footnotes?
//     .replace(/\[\^.+?\](\: .*?$)?/g, '')
//     .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
//     // Remove images
//     .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
//     // Remove inline links
//     .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
//     // Remove blockquotes
//     .replace(/^\s{0,3}>\s?/g, '')
//     // Remove reference-style links?
//     .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
//     // Remove atx-style headers
//     .replace(
//       /^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm,
//       '$1$2$3',
//     )
//     // Remove emphasis (repeat the line to remove double emphasis)
//     .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
//     .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
//     // Remove code blocks
//     .replace(/(`{3,}).*?\1/gs, '')
//     // Remove inline code
//     .replace(/`(.+?)`/g, '$1')
//     // Replace two or more newlines with exactly two? Not entirely sure this belongs here...
//     .replace(/\n{2,}/g, '\n\n')
//     // handling md tables
//     .replace(/(\/|-|\s)+/g, ' ');

// temp
const rawToText = (rawBody) => rawBody.replace(/(\\n|\W)+/g, '');

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
  arr.flatMap(({ children: [entry] }, i) => {
    const {
      fileAbsolutePath,
      rawBody,
      objectID,
      frontmatter: { title },
    } = entry;
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
      `/${cutStrippedDirectory}/${title.replace(/\//g, '-')}`,
    );
    console.log('processing file #', i, title);
    return rearrange(rawToText(rawBody)).map((piece, i) => ({
      title,
      objectID: `${objectID}-${i}`,
      slug: utils.compose(
        noTrailingSlash,
        dedupeExamples,
        removeGuidesAndRedirectWelcome,
        utils.unorderify,
      )(path),
      content: piece,
    }));
    // @TODO: optimize chucking
    // return rawToText(rawBody)
    //   .split('\n\n')
    //   .map((piece, i) => ({
    //     title,
    //     objectID: `${objectID}-${i}`,
    //     slug: utils.compose(
    //       noTrailingSlash,
    //       dedupeExamples,
    //       removeGuidesAndRedirectWelcome,
    //       utils.unorderify,
    //     )(path),
    //     content: piece,
    //   }));
  });

// main query
// keep the length of excerpt really absurd to make sure the article comes in full
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
        }
        rawBody
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
