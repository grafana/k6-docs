import classNames from 'classnames';
import { DocLinksBlock } from 'components/pages/doc-examples/doc-links-block';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/shared/page-info';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { graphql, useStaticQuery } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import SeoMetadata from 'utils/seo-metadata';

export default function Examples({ pageContext: { sidebarTree, navLinks } }) {
  useScrollToAnchor();
  const contentContainerRef = useRef(null);
  const pageMetadata = SeoMetadata.examples;

  const {
    docExamplesJson: { tutorialsBlockLinks, examplesBlockLinks },
  } = useStaticQuery(graphql`
    query blockLinksData {
      docExamplesJson {
        tutorialsBlockLinks: tutorials {
          title
          description
          url
          to
        }
        examplesBlockLinks: examples {
          title
          description
          url
          to
        }
      }
    }
  `);
  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );
  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
      >
        <PageInfo
          title={'Examples & Tutorials'}
          description={
            'This section lists a few of the most common k6 code examples and popular tutorials.'
          }
        />
        <div className={`${docPageContent.inner} `}>
          <StickyContainer>
            <div ref={contentContainerRef} className={stickyContainerClasses}>
              <DocLinksBlock title={'Examples'} links={examplesBlockLinks} />
              <DocLinksBlock
                title={'Tutorials'}
                links={tutorialsBlockLinks}
                last
              />
            </div>
            <Sticky topOffset={-15} bottomOffset={0} disableCompensation>
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
    </LocaleProvider>
  );
}
