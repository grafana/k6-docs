import classNames from 'classnames';
import {
  ExtensionsQuickstart,
  ExtensionsOverview,
  ExtensionsUseCases,
  WhatIsXk6,
} from 'components/pages/doc-extensions';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/shared/page-info';
import { SEO } from 'components/shared/seo';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { Link } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import SeoMetaData from 'utils/seo-metadata';

import Blockquote from '../../components/shared/blockquote';

const Extensions = ({ pageContext: { sidebarTree, navLinks } }) => {
  useScrollToAnchor();

  const contentContainerRef = useRef(null);
  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        sectionName="Extensions"
      >
        <PageInfo
          title={'k6 Extensions'}
          description={`Expand the potential use cases for k6.`}
        />
        <div className={docPageContent.inner}>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <Blockquote mod="attention" title="Looking for Feedback">
              Help us improve extensions by completing this{' '}
              <Link
                to="https://docs.google.com/forms/d/e/1FAIpQLSeL1RdxAyaoznGKLAdlMa5sLmVWoytpxRCZZVzBeFGSyqGI6A/viewform"
                className="link"
              >
                short survey
              </Link>
              .
            </Blockquote>
            <ExtensionsQuickstart />
            <ExtensionsOverview />
            <WhatIsXk6 />
            <ExtensionsUseCases />
            Next,{' '}
            <Link
              to={'/extensions/get-started/explore/'}
              class={docPageContent.link}
            >
              explore
            </Link>{' '}
            the available extensions to see how you can expand your use of k6
            right now.
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

export default Extensions;

export const Head = ({ pageContext: { version } }) => (
  <SEO version={version} {...SeoMetaData.extensions} />
);
