import React, { useRef } from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import { Sticky, StickyContainer } from 'react-sticky';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import SeoMetadata from 'utils/seo-metadata';
import { HtmlContent } from 'components/blocks/html-content';
import { styles as codeStyles } from 'components/shared/code';
import CustomContentContainer from 'components/shared/custom-content-container';

import { CodeGroup } from 'components/shared/code-group';
import TableWrapper from 'components/shared/table-wrapper';
import Blockquote from 'components/shared/blockquote';
import jsApiStyles from 'components/pages/doc-javascript-api/doc-javascript-api.module.scss';
import { useScrollToAnchor } from 'hooks';

const componentsForNativeReplacement = {
  table: TableWrapper,
  blockquote: Blockquote,
  Blockquote,
};

const componentsForCustomReplacement = {
  '.code-group': CodeGroup,
  '.gatsby-highlight': CodeGroup,
};

const getContent = (nodes, sidebarTree) =>
  nodes.map(({ id, children: [entity] }) => {
    const {
      frontmatter: { title },
      body,
    } = entity;
    if (title.replace('/', '-') in sidebarTree.children) {
      return (
        <div key={id} className={jsApiStyles.moduleWrapper}>
          <h2>{title}</h2>
          <HtmlContent
            content={body}
            componentsForCustomReplacement={componentsForCustomReplacement}
            componentsForNativeReplacement={componentsForNativeReplacement}
            className={classNames(
              docPageContent.contentWRapper,
              codeStyles.docContainer,
            )}
          />
        </div>
      );
    }
  });

export default function ({ data, pageContext: { sidebarTree, navLinks } }) {
  const content = getContent(data.allFile.nodes, sidebarTree);
  const pageMetadata = SeoMetadata['javascript-api'];
  const contentContainerRef = useRef(null);
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
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <div className={`${htmlStyles.wrapper}`}>
              <CustomContentContainer label={jsApiStyles.jsApiWrapper}>
                {content}
              </CustomContentContainer>
            </div>
          </div>
          <Sticky topOffset={-15} bottomOffset={10} disableCompensation>
            {({ style }) => (
              <TableOfContents
                style={style}
                contentContainerRef={contentContainerRef}
                shouldMakeReplacement
              />
            )}
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
        ext: { in: [".md"] }
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
              description
            }
          }
        }
      }
    }
  }
`;
