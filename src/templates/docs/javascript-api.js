import classNames from 'classnames';
import { HtmlContent } from 'components/blocks/html-content';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import jsApiStyles from 'components/pages/doc-javascript-api/doc-javascript-api.module.scss';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import Blockquote from 'components/shared/blockquote';
import { CodeGroup, Code, CodeInline } from 'components/shared/code';
import CustomContentContainer from 'components/shared/custom-content-container';
import TableWrapper from 'components/shared/table-wrapper';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import { graphql } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import SeoMetadata from 'utils/seo-metadata';

const componentsForNativeReplacement = {
  table: TableWrapper,
  blockquote: Blockquote,
  Blockquote,
  inlineCode: CodeInline,
  pre: Code,
  CodeGroup,
};

const getContent = (nodes, sidebarTree) =>
  // eslint-disable-next-line array-callback-return,consistent-return
  nodes.map(({ id, children: [entity] }) => {
    const {
      frontmatter: { title },
      body,
    } = entity;
    if (title.replace(/\//g, '-') in sidebarTree.children) {
      return (
        <div key={id} className={jsApiStyles.moduleWrapper}>
          <h2>{title}</h2>
          <HtmlContent
            content={body}
            componentsForNativeReplacement={componentsForNativeReplacement}
            className={classNames(docPageContent.contentWrapper)}
          />
        </div>
      );
    }
    return null;
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
                style={{ ...style, left: 350 }}
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
