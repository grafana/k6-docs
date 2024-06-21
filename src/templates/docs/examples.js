import classNames from 'classnames';
import { DocLinksBlock } from 'components/pages/doc-examples/doc-links-block';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/shared/page-info';
import { SEO } from 'components/shared/seo';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { graphql, useStaticQuery } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import SeoMetaData from 'utils/seo-metadata';

const Examples = ({ pageContext: { sidebarTree, navLinks } }) => {
  useScrollToAnchor();
  const contentContainerRef = useRef(null);

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
        sectionName="Examples"
        canonicalUrl={SeoMetaData.examples.data.canonicalUrl}
      >
        <PageInfo
          title={'Examples & Tutorials'}
          description={
            'This section lists a few of the most common k6 code examples and popular tutorials.'
          }
        />
        <div className={`${docPageContent.inner} `}>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <DocLinksBlock title={'Examples'} links={examplesBlockLinks} />
            <DocLinksBlock
              title={'Tutorials'}
              links={tutorialsBlockLinks}
              last
            />
          </div>
          <TableOfContents
            contentContainerRef={contentContainerRef}
            shouldMakeReplacement
          />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
};

export default Examples;

export const Head = ({ pageContext: { version } }) => (
  <SEO version={version} {...SeoMetaData.examples} />
);
