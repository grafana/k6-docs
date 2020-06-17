import React from 'react';
import classNames from 'classnames';
import { graphql, Link } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import { Sticky, StickyContainer } from 'react-sticky';
import {
  slugify,
  stripDirectoryPath,
  unorderify,
  compose,
  noSlugDuplication,
} from 'utils';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import SeoMetadata from 'utils/seo-metadata';
import { HtmlContent } from 'components/blocks/html-content';
import { styles as codeStyles } from 'components/shared/code';
import CustomContentContainer from 'components/shared/custom-content-container';

import { CodeGroup } from 'components/pages/doc-page/code-group';
import TableWrapper from 'components/pages/doc-page/table-wrapper';
import { HeadingLandmark } from 'components/shared/heading';
import Blockquote from 'components/pages/doc-page/blockquote';
import jsApiStyles from 'components/pages/doc-javascript-api/doc-javascript-api.module.scss';
import { useScrollToAnchor } from 'hooks';

// Return an array of { module: <div>, classes: [<tr>...], functions: [<tr>...] } objects.
// Top-level documents (modules) as defined by the sidebarTree will be
// rendered as header+content, and child documents as table rows.
function buildIndex(nodes, sidebarTree) {
  const index = [];

  const components = {
    '.code-group': CodeGroup,
    h2: HeadingLandmark,
    table: TableWrapper,
    '.doc-blockquote': Blockquote,
  };

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const md = node.children[0];
    if (md.frontmatter.title.replace('/', '-') in sidebarTree.children) {
      index.push({
        module: (
          <div key={node.id} className={jsApiStyles.moduleWrapper}>
            <h2>{md.frontmatter.title}</h2>
            <HtmlContent
              content={md.body}
              components={components}
              className={classNames(
                docPageContent.contentWRapper,
                codeStyles.docContainer,
              )}
            />
          </div>
        ),
        classes: [],
        functions: [],
      });
      continue;
    }

    // FIXME: Hack to avoid showing methods in the Functions table.
    // This needs a more structural fix (exclude by frontmatter field?),
    // but I wasn't able to get an exclude filter working with allFile or
    // allMarkdownRemark.
    if (
      md.frontmatter.title.match(
        /(CookieJar|Counter|Gauge|Rate|Response|Selection|Socket|Trend)\./,
      )
    ) {
      continue;
    }

    const path = `${stripDirectoryPath(
      node.relativeDirectory,
      'docs',
    )}/${md.frontmatter.title.replace(/\//g, '-')}`;
    const slug = compose(unorderify, slugify)(path);

    const row = (
      <tr key={node.id}>
        <td>
          <Link to={`/${slug}`}>{md.frontmatter.title}</Link>
        </td>
        <td>{md.frontmatter.description}</td>
      </tr>
    );

    let nodeType = 'functions';
    if (md.frontmatter.category === 'k6api-class') {
      nodeType = 'classes';
    }

    const last = index[index.length - 1];
    // skip row addition if there is an identical slug already exists in main module
    if (noSlugDuplication(last, slug)) {
      last[nodeType].push(row);
    }
  }

  return index;
}

function createTableMaybe(elements, header) {
  if (elements.length > 0) {
    return (
      <div className={jsApiStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>{header}</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function ({ data, pageContext: { sidebarTree, navLinks } }) {
  const index = buildIndex(data.allFile.nodes, sidebarTree);
  const pageMetadata = SeoMetadata['javascript-api'];

  useScrollToAnchor();

  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );
  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <PageInfo
        title={'JavaScript API'}
        description={'Welcome to the k6 JavaScript API documentation.'}
      />
      <div className={docPageContent.inner}>
        <StickyContainer>
          <div className={stickyContainerClasses}>
            <div className={`${htmlStyles.wrapper}`}>
              <CustomContentContainer label={jsApiStyles.jsApiWrapper}>
                {index.map(({ module, classes, functions }) => {
                  const out = [module];
                  out.push(createTableMaybe(classes, 'Class'));
                  out.push(createTableMaybe(functions, 'Function'));
                  return out;
                })}
              </CustomContentContainer>
            </div>
          </div>
          <Sticky topOffset={-15} bottomOffset={10} disableCompensation>
            <TableOfContents contentContainerSelector={docPageContent.inner} />
          </Sticky>
        </StickyContainer>
      </div>
    </DocLayout>
  );
}

export const query = graphql`
  query IndexQuery {
    allFile(
      filter: {
        ext: { in: [".md", ".mdx"] }
        relativeDirectory: { regex: "/javascript api/" }
      }
      sort: { fields: absolutePath, order: ASC }
    ) {
      nodes {
        id
        relativeDirectory
        children {
          ... on Mdx {
            body
            frontmatter {
              title
              category
              description
            }
          }
        }
      }
    }
  }
`;
