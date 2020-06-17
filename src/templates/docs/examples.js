import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import classNames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import { DocLinksBlock } from 'components/pages/doc-examples/doc-links-block';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import SeoMetadata from 'utils/seo-metadata';
import { useScrollToAnchor } from 'hooks';
import TableOfContents from 'components/pages/doc-page/table-of-contents';

export default function ({ pageContext: { sidebarTree, navLinks } }) {
  useScrollToAnchor();

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
          <div className={stickyContainerClasses}>
            <DocLinksBlock title={'Examples'} links={examplesBlockLinks} />
            <DocLinksBlock
              title={'Tutorials'}
              links={tutorialsBlockLinks}
              last
            />
          </div>
          <Sticky topOffset={-15} bottomOffset={0} disableCompensation>
            <TableOfContents contentContainerSelector={docPageContent.inner} />
          </Sticky>
        </StickyContainer>
      </div>
    </DocLayout>
  );
}
