import classNames from 'classnames';
import { HtmlContent } from 'components/blocks/html-content';
import htmlStyles from 'components/blocks/html-content/html-content.module.scss';
import jsApiStyles from 'components/pages/doc-javascript-api/doc-javascript-api.module.scss';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import Blockquote from 'components/shared/blockquote';
import {
  CodeGroup,
  Code,
  CodeInline,
  styles as codeStyles,
} from 'components/shared/code';
import CustomContentContainer from 'components/shared/custom-content-container';
import { Link } from 'components/shared/link';
import { PageInfo } from 'components/shared/page-info';
import TableWrapper from 'components/shared/table-wrapper';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { graphql } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import SeoMetadata from 'utils/seo-metadata';
import { LATEST_VERSION, SUPPORTED_VERSIONS } from 'utils/utils.node';

const componentsForNativeReplacement = {
  table: TableWrapper,
  blockquote: Blockquote,
  Blockquote,
  inlineCode: CodeInline,
  pre: Code,
  CodeGroup,
};

const getContent = (nodes, alternativeNodes, sidebarTree, version) =>
  // eslint-disable-next-line array-callback-return,consistent-return
  nodes.map(({ id, relativeDirectory, children: [entity] }) => {
    const {
      frontmatter: { title },
      body,
    } = entity;
    if (title.replace(/\//g, '-') in sidebarTree.children) {
      // skip found alternative content to avoid rendering it twice
      if (relativeDirectory.endsWith('/alternative main modules')) {
        return null;
      }

      // try find alternative content
      const alternativeNode = alternativeNodes.find(
        (item) => item.children[0].frontmatter.title === title,
      );

      // if alternative content exists, render it
      if (typeof alternativeNode !== 'undefined') {
        return (
          <div key={id} className={jsApiStyles.moduleWrapper}>
            <h2>{title}</h2>
            <HtmlContent
              content={alternativeNode.children[0].body}
              componentsForNativeReplacement={{
                ...componentsForNativeReplacement,
                a: Link(version),
              }}
              className={classNames(docPageContent.contentWrapper)}
            />
          </div>
        );
      }

      return (
        <div key={id} className={jsApiStyles.moduleWrapper}>
          <h2>{title}</h2>
          <HtmlContent
            content={body}
            componentsForNativeReplacement={{
              ...componentsForNativeReplacement,
              a: Link(version),
            }}
            className={classNames(docPageContent.contentWrapper)}
          />
        </div>
      );
    }
    return null;
  });

export default function VersionedJavascriptAPI({
  data,
  pageContext: { sidebarTree, navLinks, version = LATEST_VERSION },
}) {
  const content = getContent(
    data.content.nodes,
    data.alternativeContent.nodes,
    sidebarTree,
    version,
  );
  const pageMetadata = SeoMetadata['javascript-api'];
  const contentContainerRef = useRef(null);
  useScrollToAnchor();

  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
    codeStyles.codeContainer,
  );

  const pageVersions = {};
  pageVersions[LATEST_VERSION] = { path: '/javascript-api/' };
  SUPPORTED_VERSIONS.forEach((version) => {
    pageVersions[version] = {
      path: `/${version}/javascript-api/`,
    };
  });

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
        version={version}
        path="/javascript-api/"
        pageVersions={pageVersions}
        sectionName="Javascript API"
      >
        <PageInfo
          title={'JavaScript API'}
          description={'Welcome to the k6 JavaScript API documentation.'}
          className={classNames(version !== LATEST_VERSION && jsApiStyles.info)}
        />
        <div className={docPageContent.inner}>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <div className={`${htmlStyles.wrapper}`}>
              <CustomContentContainer label={jsApiStyles.jsApiWrapper}>
                {content}
              </CustomContentContainer>
            </div>
          </div>
          <TableOfContents
            contentContainerRef={contentContainerRef}
            shouldMakeReplacement
          />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}

export const query = graphql`
  query IndexVersionedQuery(
    $versionRegex: String!
    $alternativeVersionRegex: String!
  ) {
    content: allFile(
      filter: {
        ext: { in: [".md"] }
        relativeDirectory: { regex: $versionRegex }
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
    alternativeContent: allFile(
      filter: {
        ext: { in: [".md"] }
        relativeDirectory: { regex: $alternativeVersionRegex }
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
